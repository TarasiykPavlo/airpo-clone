import supabase, { supabaseUrl } from "./supabase";

export async function login({ email, password }) {
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) throw new Error(error.message);

	return data;
}

export async function authGoogle() {
	supabase.auth.signInWithOAuth({
		provider: "google",
	});
}

export async function signup({ fullName, email, password }) {
	const { data, error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			data: {
				fullName,
				avatar: "",
			},
		},
	});

	if (error) throw new Error(error.message);

	return data;
}

export async function getCurrentUser() {
	const { data: session } = await supabase.auth.getSession();

	if (!session.session) return null;

	const { data, error } = await supabase.auth.getUser();

	if (error) throw new Error(error.message);

	return data?.user;
}

export async function logout() {
	const { error } = await supabase.auth.signOut();
	if (error) throw new Error(error.message);
}

export async function updateCurrentUser(props) {
	const fileName = `avatar-${Math.random()}`;

	const { error: storageError } = await supabase.storage
		.from("avatar")
		.upload(fileName, props);

	if (storageError) throw new Error(storageError.message);

	const { data: updatedUser, error: userError } =
		await supabase.auth.updateUser({
			data: {
				avatar: `${supabaseUrl}/storage/v1/object/public/avatar/${fileName}`,
			},
		});

	if (userError) throw new Error(userError.message);
	return updatedUser;
}
