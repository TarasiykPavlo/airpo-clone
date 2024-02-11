import supabase from "./supabase";

export async function getClientData(userId) {
	const { data } = await supabase
		.from("Clients")
		.select("id, aicoin")
		.eq("authId", userId);

	if (data[0] === undefined) {
		await supabase.from("Clients").insert({ authId: userId });

		data = await supabase
			.from("Clients")
			.select("id, aicoin")
			.eq("authId", userId);

		const { data: rowData, error } = await supabase
			.from("Clients")
			.select("id, aicoin")
			.eq("authId", userId);

		if (error) throw new Error(error.message);

		let [data] = rowData;

		if (data === undefined) {
			await supabase.from("Clients").insert({ authId: userId });

			data = await supabase
				.from("Clients")
				.select("id, aicoin")
				.eq("authId", userId);
		}

		return data;
	}
	return data[0];
}

export async function getClientAicoinHistory(userId) {
	let { data: clientsAicoinLogsData } = await supabase
		.from("ClientsAicoinLogs")
		.select("created_at, aicoin")
		.eq("authId", userId);

	if (clientsAicoinLogsData[0] === undefined) {
		await supabase.from("ClientsAicoinLogs").insert({ authId: userId });

		clientsAicoinLogsData = await supabase
			.from("ClientsAicoinLogs")
			.select("created_at, aicoin")
			.eq("authId", userId);
  }
  
	const created_at = getListfromDictionary(clientsAicoinLogsData, "created_at");
	const aicoin = getListfromDictionary(clientsAicoinLogsData, "aicoin");
	return { created_at, aicoin };
}

export async function getClientReferralHistory(userId) {
	var { data: clientsAicoinLogsData } = await supabase
		.from("ClientsAicoinLogs")
		.select("created_at, aicoin")
		.eq("authId", userId);
	if (clientsAicoinLogsData[0] === undefined) {
		await supabase.from("ClientsAicoinLogs").insert({ authId: userId });
		clientsAicoinLogsData = await supabase
			.from("ClientsAicoinLogs")
			.select("created_at, aicoin")
			.eq("authId", userId);
	}
	var created_at = getListfromDictionary(clientsAicoinLogsData, "created_at");
	var aicoin = getListfromDictionary(clientsAicoinLogsData, "aicoin");
	return { created_at, aicoin };
}

function getListfromDictionary(list, keyDictionary) {
	const a = [];
	for (let i = 0; i < list.length; i++) {
		a.push(list[i][keyDictionary]);
	}
	return a;
}
