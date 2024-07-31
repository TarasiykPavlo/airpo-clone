import { linksResponse } from "../utils/constants";
import { postResponseToLink } from "./apiApplication";
import supabase from "./supabase";
//import supabaseP from "./supabasePartner";

async function createRef(authId, refLink) {
  await createRefForClient(authId, refLink);
  const data = { authId, refLink };
  const { status } = await postResponseToLink(
    data,
    linksResponse.create_partner_to_client_ref
  );
  console.log(status);
  // await createRefForPartner(authId, refLink);
  // await updateOrInsertPartnersAnalytical(refLink)
}

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
    createRef();
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
      "name, active, isRunning, id, progType, botId, apiId, selectTemplateId, created_at"
    )
    .match({ authId: userId });

  return ClientCompanysData;
}

export async function selectClientsPermissions(userid) {
  const { data } = await supabase
    .from("ClientsPermissions")
    .select("progType,LimitOfСompanies,activatedUntil")
    .match({ authId: userid, active: true });
  return data;
}

export async function getCompanyDataForSettings(companyId) {
  let { data: ClientsCompanysData } = await supabase
    .from("ClientsCompanyBase")
    .select("*")
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
  // else {
  //   await supabase
  //     .from("ClientsCompanyBase")
  //     .update({ botId: null, apiId: null, apiHash: null })
  //     .eq("id", companyId);
  // }
}

export async function updateCompanyProxy(companyId, proxyType, proxy) {
  await supabase
    .from("ClientsCompanyBase")
    .update({ proxyType, proxy })
    .eq("id", companyId);
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

export async function createGroupinCompany(
  companyId,
  name,
  tag,
  priority,
  region,
  сategories
) {
  //console.log({companyId, name, tag, priority, region, сategories});
  await supabase
    .from("ClientsCompanyGroupsBase")
    .insert({ companyId, name, tag, priority, region, сategories });
}

export async function delGroupinCompany(groupId) {
  await supabase.from("ClientsCompanyGroupsBase").delete().eq("id", groupId);
}

async function createRefForClient(authId, refLink) {
  const { data } = await supabase
    .from("ClientsReferralLogs")
    .select("authId")
    .eq("authIdRegistered", authId);
  if (data.length == 0) {
    await supabase
      .from("ClientsReferralLogs")
      .insert({ authIdRegistered: authId, authId: refLink });
  }
}

// async function createRefForPartner(authId, refLink) {
//   const data = supabaseP
//     .from("RefRegLogs")
//     .select("refLink")
//     .eq("authId", authId);
//   if (data.length == 0) {
//     await supabase
//       .from("RefRegLogs")
//       .insert({ clinetId: authId, refLink: refLink });
//   }
// }

// async function updateOrInsertPartnersAnalytical(refLink) {
//   const nowDate = new Date();
//   const month =
//     nowDate.getMonth() + 1 < 10
//       ? "0" + (nowDate.getMonth() + 1)
//       : nowDate.getMonth() + 1;
//   const correctFormatDate =
//     nowDate.getFullYear() + "-" + month + "-" + nowDate.getDate();

//   const { data: selectPartnerId } = await supabaseP
//     .from("PartnersRefLinks")
//     .select("name")
//     .eq("refLink", refLink);

//   const { data: selectUniqueFromAnalitica } = await supabaseP
//     .from("PartnersAnalyticalTable")
//     .select("getClients")
//     .match({
//       date: correctFormatDate,
//       name: selectPartnerId[0].name,
//       partnerId: refLink,
//       refLink: refLink,
//     });

//   if (selectUniqueFromAnalitica.length === 0) {
//     await supabaseP.from("PartnersAnalyticalTable").insert({
//       refLink: refLink,
//       name: selectPartnerId[0].name,
//       partnerId: refLink,
//       getClients: 1,
//     });
//   } else {
//     await supabaseP
//       .from("PartnersAnalyticalTable")
//       .update({ unique: selectUniqueFromAnalitica[0].getClients + 1 })
//       .match({
//         date: correctFormatDate,
//         partnerId: refLink,
//         name: selectPartnerId[0].name,
//         refLink: refLink,
//       });
//   }
// }

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

export async function selectShopItems() {
  let { data: ShopItems } = await supabase.from("OurShopBase").select("*");

  return ShopItems;
}

async function getData(id, from, select) {
  const { data } = await supabase.from(from).select(select).eq("authId", id);

  return data;
}
