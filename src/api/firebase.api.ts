import { collection, getDocs } from "firebase/firestore";
import { app, db } from "../../env/env";

export class FireBaseAPI {
  projectCollection = collection(db, "Projects");

  getProjects(): Promise<any> {
    return new Promise((resolve, reject) => {
      getDocs(this.projectCollection)
        .then((querySnapshot) => {
          const data: any[] = [];
          querySnapshot.forEach((doc) => {
            // Utilisez doc.data() pour obtenir les données du document
            data.push(doc.data());
          });
          resolve(data);
        })
        .catch((error) => reject(error));
    });
  }
}
