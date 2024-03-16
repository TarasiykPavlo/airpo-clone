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
  let { data: ClientCompanysData } = await supabase
    .from("ClientsCompanyBase")
    .select(
      "name, active, isRunning, id, progType, botId, apiId, selectTemplateId"
    )
    .match({ authId: userId });
  return ClientCompanysData;
}

export async function getCompanyDataForSettings(companyId) {
  let { data: ClientsCompanysData } = await supabase
    .from("ClientsCompanyBase")
    .select(
      "progType, name, phone, active, isRunning, botId, region, сategories, id, selectTemplateId, apiId, apiHash"
    )
    .eq("id", companyId);
  const ClientCompanysData = ClientsCompanysData[0];
  let ClientMessageTemplates = {};

  if (!!ClientCompanysData.selectTemplateId) {
    let { data: ClientsMessageTemplates } = await supabase
      .from("ClientsMessageTemplates")
      .select("name")
      .eq("id", ClientCompanysData.selectTemplateId);
    ClientMessageTemplates = ClientsMessageTemplates[0];
  }

  let data = {
    ClientCompanysData: ClientCompanysData,
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
  return getData(userId, "ClientsMessageTemplates", "*");
}

export async function createClientTemplate(
  userId,
  text,
  files,
  initialDelay,
  messageDelay,
  mailingInterval,
  templateName
) {
  await supabase.from("ClientsMessageTemplates").insert({
    authId: userId,
    text: text,
    files: files,
    initialDelay: initialDelay,
    messageDelay: messageDelay,
    mailingInterval: mailingInterval,
    name: templateName,
  });
}

export async function delClientTemplate(templateId) {
  await supabase.from("ClientsMessageTemplates").delete().eq("id", templateId);
}

export async function updateClientTemplate(
  templateId,
  text,
  files,
  initialDelay,
  messageDelay,
  mailingInterval,
  templateName
) {
  await supabase
    .from("ClientsMessageTemplates")
    .update({
      text: text,
      files: files,
      initialDelay: initialDelay,
      messageDelay: messageDelay,
      mailingInterval: mailingInterval,
      name: templateName,
    })
    .eq("id", templateId);
}

export async function updateCompanyTemplate(companyId, templateId) {
  await supabase
    .from("ClientsCompanyBase")
    .update({ selectTemplateId: templateId })
    .eq("id", companyId);
}

export async function updateCompanyBotData(companyId, apiId, apiHash) {
  if (apiId) {
    await supabase
      .from("ClientsCompanyBase")
      .update({ botId: null, apiId: apiId, apiHash: apiHash })
      .eq("id", companyId);
  }
}

export async function regenerateBotId(companyId) {
  //Підключення до айпі Влада
}

export async function delClientCompany(companyId) {
  await supabase.from("ClientsCompanyBase").delete().eq("id", companyId);
}

export async function saveNameCompany(companyId, nameValue) {
  await supabase
    .from("ClientsCompanyBase")
    .update({ name: nameValue })
    .eq("id", companyId);
}

export async function createRefForClient(){}

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
