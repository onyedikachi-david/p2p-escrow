interface IDatabase {
  add<T>(collection: string, document: T): Promise<void>;
  get<T>(collection: string, id: string): Promise<T | null>;
  update<T>(collection: string, id: string, document: T): Promise<void>;
  delete(collection: string, id: string): Promise<void>;
}

class InMemoryDatabase implements IDatabase {
  private db: Record<string, any> = {};

  async add<T>(collection: string, document: T): Promise<void> {
    if (!this.db[collection]) {
      this.db[collection] = [];
    }
    this.db[collection].push(document);
  }

  async get<T>(collection: string, id: string): Promise<T | null> {
    const documents = this.db[collection] || [];
    return documents.find((doc: any) => doc.id === id) || null;
  }

  async update<T>(collection: string, id: string, document: T): Promise<void> {
    if (!this.db[collection]) {
      throw new Error(`Collection ${collection} not found`);
    }
    const index = this.db[collection].findIndex((doc: any) => doc.id === id);
    if (index === -1) {
      throw new Error(
        `Document with id ${id} not found in collection ${collection}`
      );
    }
    this.db[collection][index] = document;
  }

  async delete(collection: string, id: string): Promise<void> {
    if (!this.db[collection]) {
      throw new Error(`Collection ${collection} not found`);
    }
    this.db[collection] = this.db[collection].filter(
      (doc: any) => doc.id !== id
    );
  }
}

export const db = new InMemoryDatabase();
