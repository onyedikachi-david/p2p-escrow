# P2P Escrow Contract for STX-USD Exchange

This Clarity smart contract facilitates a peer-to-peer (P2P) escrow system for exchanging Stacks (STX) tokens for USD. The contract ensures a secure and trustless environment for users and merchants to transact. It leverages the Clarity programming language, designed for predictability and security in smart contract development.

## Features

- **Exchange Request**: Users can request an exchange of STX for USD by specifying the amount of STX and their bank account details.
- **Merchant Registration**: Allows merchants to register themselves to fulfill exchange requests, specifying their full name and supported banks.
- **Payment Confirmation**: Merchants can confirm the payment to a user's bank account, which is recorded on the blockchain.
- **Funds Release**: Users can release the escrowed STX to the merchant after confirming the receipt of USD in their bank account. The contract handles the STX transfer.
- **Merchant Success Tracking**: Tracks the number of successful transfers for each merchant, enhancing trust in the system.

## Contract Functions

### Public Functions

#### `register-merchant`

Allows a principal to register as a merchant capable of fulfilling exchange requests, specifying their full name and supported banks.

**Parameters**:

- `full-name (string-utf8 100)`: The full name of the merchant.
- `supported-banks (list 10 (string-utf8 50))`: A list of banks supported by the merchant.

**Returns**: `(ok true)` on success.

#### `request-exchange`

Initiates an exchange request by a user.

**Parameters**:

- `amount-stx (uint)`: The amount of STX the user wants to exchange.
- `account-number (string-ascii 20)`: The user's bank account number.
- `account-name (string-ascii 50)`: The name on the bank account.
- `bank-name (string-ascii 50)`: The name of the bank.

**Returns**: `(ok request-id)` where `request-id` is the unique identifier for the exchange request.

#### `confirm-payment`

Called to confirm the payment to the user's bank account. This function is intended to be triggered by an off-chain hook after the merchant makes the payment.

**Parameters**:

- `request-id (uint)`: The unique identifier of the exchange request.

**Returns**: `(ok true)` on success.

#### `release-funds`

Allows the user to release the escrowed STX to the merchant after confirming the receipt of USD in their bank account. This function also handles the STX transfer from the contract to the merchant.

**Parameters**:

- `request-id (uint)`: The unique identifier of the exchange request.

**Returns**: `(ok true)` on success or `(err ERR_NOT_AUTHORIZED)` if the caller is not authorized to release the funds.

### Data Maps

- `exchange-requests`: Stores the details of each exchange request.
- `merchant-registrations`: Tracks which principals are registered as merchants, including their full name, supported banks, and the number of successful transfers.
- `payment-confirmations`: Records the payment confirmations for each exchange request.

### Errors

- `ERR_NOT_AUTHORIZED (u1001)`: Returned when a caller is not authorized to perform a certain operation.
- `ERR_INVALID_OPERATION (u1002)`: Returned for invalid operations, not used in the current version of the contract.

## License

This contract is open-source and licensed under the MIT License.

## Contributions

Contributions are welcome! Please submit a pull request or open an issue on the project's GitHub repository.

---

This README provides a comprehensive overview of the P2P Escrow Contract for STX-USD Exchange. 

