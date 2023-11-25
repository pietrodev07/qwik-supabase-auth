import { $, component$, useSignal, useStore } from "@builder.io/qwik";
import { supabase } from "~/lib/supabase";

export const Auth = component$(() => {
  const userEmail = useSignal("");
  const userPassword = useSignal("");
  const helperTextStore = useStore({ error: {}, text: "" });

  const handleLogin = $(async () => {
    const { error, } = await supabase.auth.signInWithPassword({ email: userEmail.value, password: userPassword.value });

    if (error) {
      helperTextStore.error = true;
      helperTextStore.text = error.message;
    }
  });

  return (
    <form preventdefault:submit onSubmit$={handleLogin}>
      Email: <input
        id="email"
        type="email"
        name="email"
        bind:value={userEmail}
        required
      />
      <br /><br />
      Password: <input
        id="password"
        class="bg-gray-100 border py-1 px-3"
        type="password"
        name="password"
        bind:value={userPassword}
        required
      />
      <br /><br />
      {!!helperTextStore.text && <div>{helperTextStore.text}</div>}
      <button type="submit">Login!</button>
      <br /><br />
    </form >
  );
});