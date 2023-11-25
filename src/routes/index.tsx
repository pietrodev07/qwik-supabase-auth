import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { supabase } from "~/lib/supabase";
import { Auth } from "~/components/auth";
import { Dashboard } from "~/components/dashboard";
import { type DocumentHead } from "@builder.io/qwik-city";
import { type User } from "@supabase/supabase-js";

export default component$(() => {
  const userSignal = useSignal<User | null>();

  useVisibleTask$(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      userSignal.value = session?.user ?? null;
    });

    const { data: { subscription: authListener } } = supabase.auth.onAuthStateChange((_, session) => {
      const currentUser = session?.user;
      userSignal.value = currentUser ?? null;
    });

    return () => {
      authListener.unsubscribe();
    };
  });

  return (
    <div>
      {userSignal.value ? <Dashboard user={userSignal.value} /> : <Auth />}
    </div>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};