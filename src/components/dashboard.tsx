import { component$ } from "@builder.io/qwik";
import { supabase } from "~/lib/supabase";
import { type User } from "@supabase/supabase-js";

export const Dashboard = component$((props: { user: User; }) => {
  return (
    <div>
      <p>Hello {props.user.email} from dashboard!</p>
      <button
        onClick$={async () => {
          const { error } = await supabase.auth.signOut();
          if (error) console.log('Error logging out:', error.message);
        }}
      >
        Logout
      </button>
    </div>
  );
});