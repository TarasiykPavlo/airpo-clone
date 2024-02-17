import supabase from "./supabase";

export async function getClientInfoForProfile(userId) {
  let ClientAicoinLogsData = await getData(
    userId,
    "ClientsAicoinLogs",
    "created_at, aicoin"
  );
  let ClientReferralLogs = await getData(
    userId,
    "ClientsReferralLogs",
    "authIdRegistered, remuneration"
  );

  if (!ClientAicoinLogsData.length) {
    await supabase.from("ClientsAicoinLogs").insert({ authId: userId });
    ClientAicoinLogsData = await getData(
      userId,
      "ClientsAicoinLogs",
      "created_at, aicoin"
    );
  }

  let data = {
    ClientAicoinLogsData: ClientAicoinLogsData,
    ClientReferralLogs: ClientReferralLogs,
  };

  return data;
}

export async function getCompanyData(userId) {
  let ClientCompanysData = await getData(
    userId,
    "ClientsCompanyBase",
    "progType, name, phone, active, isRunning, botId, region, сategories, id"
  );
  return ClientCompanysData;
}

export async function updateCurrentUserAicoin(aicoin) {
  if (typeof aicoin != Number) {
    const { data: updatedUser } = await supabase.auth.updateUser({
      data: {
        aicoin: 0,
      },
    });
    return updatedUser;
  }
}

async function getData(id, from, select) {
  const { data } = await supabase.from(from).select(select).eq("authId", id);

  return data;
}
