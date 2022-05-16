import firestore from '@react-native-firebase/firestore';
import { StorageService } from '../services/StorageService';

export class FirestoreDao {
  storageService = new StorageService();

  // collectionPath: string
  constructor(collectionPath) {
    if (collectionPath == null) {
      console.warn('[FirestoreDao][constructor] - collectionPath is null.');
    }
    this.collectionPath = collectionPath;
  }

  // Get the collection reference to build custom queries
  // returns: collection reference object
  getCollection() {
    return firestore().collection(this.collectionPath);
  }

  // Create a new document and generate a new Key
  // doc: pure js object of the information to create
  // returns: the key of the created document
  // UT1: push new doc check id is valid
  // UT2: push new null doc, check id is null
  async push(doc) {
    if (doc == null) {
      console.warn('[FirestoreDao][push] - doc is null.');

      return null;
    }

    try {
      const createdDoc = await firestore()
        .collection(this.collectionPath)
        .add(doc);

      return createdDoc.id;
    } catch (err) {
      console.error('[FirestoreDao][push]', err);

      return null;
    }
  }

  // Create or update a whole document for a specific key
  // docKey: string key of the document
  // doc: pure js object of the information to store
  // returns: void
  // UT1: store doc with timestamp and fetch - check it's same date
  // UT2: store doc with null key and fetch: check hasn't changed
  // UT3: store doc with null doc and fetch: check hasn't changed
  async store(docKey, doc) {
    if (docKey == null) {
      console.warn('[FirestoreDao][store] - docKey is null.');
    }

    if (doc == null) {
      console.warn('[FirestoreDao][store] - doc is null.');
    }

    try {
      await firestore().collection(this.collectionPath).doc(docKey).set(doc);
    } catch (err) {
      console.error('[FirestoreDao][store]', err);
    }
  }

  // Update attributes of a document for a specific key
  // docKey: string key of the document
  // partialDoc: pure js partial object of the attributes to update
  // returns: void
  async update(docKey, partialDoc) {
    if (docKey == null) {
      console.warn('[FirestoreDao][update] - docKey is null.');
    }

    if (partialDoc == null) {
      console.warn('[FirestoreDao][update] - partialDoc is null.');
    }

    try {
      await firestore()
        .collection(this.collectionPath)
        .doc(docKey)
        .update(partialDoc);
    } catch (err) {
      console.error('[FirestoreDao][update]', err);
    }
  }

  // Fetch one document for a specific key
  // docKey: string key of the document
  // returns: document in pure js
  // UT1: Fetch with a valid key - returns an obj
  // UT2: Fetch with an invalid key - returns null
  // UT3: Fetch with an null key - returns null
  async fetchOne(docKey) {
    if (docKey == null) {
      console.warn('[FirestoreDao][fetchOne] - docKey is null.');

      return null;
    }

    try {
      const doc = await firestore()
        .collection(this.collectionPath)
        .doc(docKey)
        .get();

      if (doc != null) {
        const result = { ...doc.data(), key: doc.id };
        if (result.image) {
          await this.storageService.getUrl('/' + result.image).then((url) => {
            result.imageUrl = url;
          });
        }
        return result;
      }

      return null;
    } catch (err) {
      console.error('[FirestoreDao][fetchOne]', err);

      return null;
    }
  }

  // Fetch all documents
  // returns: array of documents in pure js
  // UT1: Fetch all - returns an array
  async fetchAll() {
    try {
      const result = await firestore().collection(this.collectionPath).get();

      if (result?.docs?.length > 0) {
        return result.docs.map(doc => {
          return { ...doc.data(), key: doc.id };
        });
      }

      return [];
    } catch (err) {
      console.error('[FirestoreDao][fetchAll]', err);

      return null;
    }
  }

  // Delete one document for a specic key
  // docKey: string key of the document
  // returns: void
  // UT1: add and remove one - fetch shouldn't be there
  // UT2: add and remove invalid one - fetch should still be there
  async remove(docKey) {
    if (docKey == null) {
      console.warn('[FirestoreDao][remove] - docKey is null.');

      return null;
    }

    try {
      await firestore().collection(this.collectionPath).doc(docKey).delete();
    } catch (err) {
      console.error('[FirestoreDao][remove]', err);
    }
  }
}