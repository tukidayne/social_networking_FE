import { auth } from "../services/firebase";

export function signup(email, password) {
  return auth().createUserWithEmailAndPassword(email, password);
}

export function signin(email, password) {
  return auth()
    .signInWithEmailAndPassword(email, password)
    .then((res) => console.log(res));
}

export function logout() {
  return auth().signOut();
}
