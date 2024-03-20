
;; p2p
;; <add a description here>

;; constants
(define-constant ERR_NOT_AUTHORIZED u1001)
(define-constant ERR_INVALID_OPERATION u1002)

;; data maps and vars
(define-data-var request-id-count uint u0)
(define-data-var marchant-id-count uint u0)
(define-map exchange-requests
  { request-id: uint }
  {
    requester: principal,
    amount-stx: uint,
    bank-account: (tuple (number (string-ascii 20)) (name (string-ascii 50)) (bank-name (string-ascii 50)))
  }
)

(define-map merchant-registrations
  { merchant-id: uint }
  { 
    registered: bool,
    full-name: (string-utf8 100),
    email: (string-utf8 50),
    supported-banks: (list 2 (string-utf8 50)),
    successful-transfers: uint
  }
)

(define-map payment-confirmations
  { request-id: uint }
  { confirmed: bool }
)

;; private functions
;;

;; public functions
;; Function to register as a merchant
(define-public (register-merchant (full-name (string-utf8 100)) (email (string-utf8 50)) (supported-banks (list 2 (string-utf8 50))))
  (begin
    (map-set merchant-registrations 
      { merchant-id: (var-get marchant-id-count) } 
      { 
        registered: true,
        full-name: full-name,
        email: email,
        supported-banks: supported-banks,
        successful-transfers: u0
      })
    ;; (var-set marchant-id-count (+ 1 expr-2))
    ;; (+ 1 (var-set marchant-id-count value))
    (let ((marchant-id-inc (var-get marchant-id-count))) (var-set marchant-id-count (+ marchant-id-inc u1)))
    (print { action: "register-merchant", merchant-id: (var-get marchant-id-count) })
    (ok true)
  )
)

;; Function to request an exchange
(define-public (request-exchange (amount-stx uint) (account-number (string-ascii 20)) (account-name (string-ascii 50)) (bank-name (string-ascii 50)))
  (let ((request-id (+ u1 (var-get request-id-count))))
    ;; Attempt to transfer the specified amount of STX to the contract
    (match (stx-transfer? amount-stx tx-sender (as-contract tx-sender))
      success
        (begin
          ;; If the transfer is successful, create the exchange request
          (map-set exchange-requests 
            { request-id: request-id } 
            { requester: tx-sender, amount-stx: amount-stx, bank-account: { number: account-number, name: account-name, bank-name: bank-name } })
          ;; Increment and store the next request ID
          (var-set request-id-count request-id)
          (print "Exchange request created")
          (ok request-id)
        )
      error
        ;; If the STX transfer fails, return an error
        (err error)
    )
  )
)

;; Function to confirm payment by a merchant (to be called by an off-chain hook)
(define-public (confirm-payment (request-id uint))
  (begin
    (map-set payment-confirmations { request-id: request-id } { confirmed: true })
    (ok true)
  )
)

;; Function for the user to release funds after confirming payment receipt
(define-public (release-funds (request-id uint))
 (let ((request (map-get? exchange-requests { request-id: request-id })))
  (if (and (is-some request) (is-eq (unwrap! (get requester request) (err ERR_NOT_AUTHORIZED)) tx-sender))
    (let ((amount-stx (get amount-stx (unwrap! request (err ERR_INVALID_OPERATION)))))
      ;; Attempt to transfer STX to the requester
      (match (stx-transfer? amount-stx tx-sender (get requester (unwrap! request (err ERR_INVALID_OPERATION))))
        success
          (begin
            ;; Delete the request from the exchange-requests map after successful transfer
            (map-delete exchange-requests { request-id: request-id })
            (ok true)
          )
        error (err error))
    )
    (err ERR_NOT_AUTHORIZED)
  )
 )
)


(define-read-only (get-merchant-details (merchant uint))
  (map-get? merchant-registrations { merchant-id: merchant })
)

(define-read-only (get-merchant-id-count)
  (ok (var-get marchant-id-count))
)


(define-read-only (is-request-available (request-id uint))
  (let ((request (map-get? exchange-requests { request-id: request-id })))
    (if (is-some request)
      (let ((payment-confirmation (map-get? payment-confirmations { request-id: request-id })))
        (if (is-some payment-confirmation)
          ;; If there's a payment confirmation entry, the request is no longer available.
          (ok false)
          ;; No payment confirmation found, the request is still available.
          (ok true)
        ))
      ;; If the request doesn't exist in exchange-requests, it's not available.
      (ok false)
    )
  )
)