import supabase from "./supabase";

export async function getClientInfoForProfile(userId) {
	let ClientAicoinLogsData = await getData(userId, "ClientsAicoinLogs", "created_at, aicoin");
	let ClientReferralLogs = await getData(userId, "ClientsReferralLogs", "authIdRegistered, remuneration");

	if (!ClientAicoinLogsData.length) {
		await supabase.from("ClientsAicoinLogs").insert({ authId: userId });
		ClientAicoinLogsData = await getData(userId, "ClientsAicoinLogs", "created_at, aicoin");
	}
	
	let data = {
		ClientAicoinLogsData: ClientAicoinLogsData,
		ClientReferralLogs: ClientReferralLogs,
	}

	return data;
}
export async function updateCurrentUserAicoin(userId) {
	let ClientsData = await getData(userId, "Clients", "id, aicoin");
	if (!ClientsData.length) {
		await supabase.from("Clients").insert({ authId: userId });
		ClientsData = await getData(userId, "Clients", "id, aicoin");
	} 
	const {data: updatedUser} = await supabase.auth.updateUser(
		{
			data: {
				aicoin: ClientsData[0].aicoin,
			},
		}
	);
	return updatedUser;
}

async function getData(id, from, select) {
	const { data } = await supabase.from(from).select(select).eq("authId", id);

	return data;
}
