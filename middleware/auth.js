export default function({ store, redirect }) {
  const isLogged = store.getters["authentication/isLogged"];
  if (!isLogged) {
    return redirect("/auth");
  }
}
