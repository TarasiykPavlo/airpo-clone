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

export async function getCompanies(userId) {
  let {data: ClientCompanysData} = await supabase
    .from("ClientsCompanyBase")
    .select("name, active, isRunning, id, progType, botId, selectTemplateId")
    .match({ 'authId': userId });
  return ClientCompanysData;
}

export async function getCompanyDataForSettings(companyId) {
  let { data: ClientsCompanysData } = await supabase
    .from("ClientsCompanyBase")
    .select(
      "progType, name, phone, active, isRunning, botId, region, сategories, id, selectTemplateId"
    )
    .eq("id", companyId);
  const ClientCompanysData = ClientsCompanysData[0];
  let ClientCompanyBot = {};
  let ClientMessageTemplates = {};

  if (!!ClientCompanysData.botId) {
    let { data: ClientsCompanyBot } = await supabase
      .from("OurBotData")
      .select("apiId, apiHash")
      .eq("id", ClientCompanysData.botId);
    ClientCompanyBot = ClientsCompanyBot[0];
  }

  if (!!ClientCompanysData.selectTemplateId) {
    let { data: ClientsMessageTemplates } = await supabase
      .from("ClientsMessageTemplates")
      .select("name")
      .eq("id", ClientCompanysData.selectTemplateId);
    ClientMessageTemplates = ClientsMessageTemplates[0];
  }

  let data = {
    ClientCompanysData: ClientCompanysData,
    ClientCompanyBot: ClientCompanyBot,
    ClientMessageTemplates: ClientMessageTemplates,
  };

  return data;
}

export async function getCompanyGroups(companyId) {
  let { data: ClientsCompanyGroupsBase } = await supabase
    .from("ClientsCompanyGroupsBase")
    .select("*")
    .eq("companyId", companyId);

  return ClientsCompanyGroupsBase;
}

export async function getClientTemlates(userId) {
  return getData(userId, "ClientsMessageTemplates", "*")
}

export async function DelClientCompany(companyId) {
  await supabase
    .from("ClientsCompanyBase")
    .delete()
    .eq("id", companyId);
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
