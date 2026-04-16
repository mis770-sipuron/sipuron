import type { GreenApiResponse, GreenApiGroup } from "./types";

function getConfig() {
  const instanceId = process.env.GREEN_API_INSTANCE;
  const apiToken = process.env.GREEN_API_TOKEN;

  if (!instanceId || !apiToken) {
    throw new Error(
      "Missing Green API credentials. Set GREEN_API_INSTANCE and GREEN_API_TOKEN env vars."
    );
  }

  return { instanceId, apiToken };
}

function buildUrl(method: string): string {
  const { instanceId, apiToken } = getConfig();
  return `https://7105.api.greenapi.com/waInstance${instanceId}/${method}/${apiToken}`;
}

async function greenApiPost<T>(method: string, body: Record<string, unknown>): Promise<T> {
  const url = buildUrl(method);

  console.log(`[GreenAPI] POST ${method}`);

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const text = await response.text();
    console.error(`[GreenAPI] HTTP ${response.status}: ${text}`);
    throw new Error(`Green API error: HTTP ${response.status}`);
  }

  const data = (await response.json()) as T;
  return data;
}

/**
 * Send a text message to a chat.
 * @param chatId - Recipient chat ID (e.g. "972501234567@c.us")
 * @param message - Text message content
 */
export async function sendMessage(
  chatId: string,
  message: string
): Promise<GreenApiResponse> {
  return greenApiPost<GreenApiResponse>("sendMessage", {
    chatId,
    message,
  });
}

/**
 * Send a file (audio/video/image) by URL with an optional caption.
 * @param chatId - Recipient chat ID
 * @param url - Public URL of the file to send
 * @param caption - Optional caption text
 */
export async function sendFileByUrl(
  chatId: string,
  url: string,
  caption?: string
): Promise<GreenApiResponse> {
  const fileName = url.split("/").pop() || "file";

  return greenApiPost<GreenApiResponse>("sendFileByUrl", {
    chatId,
    urlFile: url,
    fileName,
    ...(caption && { caption }),
  });
}

/**
 * Send a poll to a chat.
 * @param chatId - Recipient chat ID
 * @param question - Poll question
 * @param options - Array of poll options (2-12 items)
 */
export async function sendPoll(
  chatId: string,
  question: string,
  options: string[]
): Promise<GreenApiResponse> {
  return greenApiPost<GreenApiResponse>("sendPoll", {
    chatId,
    message: question,
    options: options.map((option) => ({ optionName: option })),
  });
}

/**
 * Create a new WhatsApp group.
 * @param name - Group name
 * @param participants - Array of participant chat IDs (e.g. ["972501234567@c.us"])
 */
export async function createGroup(
  name: string,
  participants: string[]
): Promise<{ created: boolean; chatId: string }> {
  return greenApiPost<{ created: boolean; chatId: string }>("createGroup", {
    groupName: name,
    chatIds: participants,
  });
}

/**
 * Add a participant to a WhatsApp group.
 * @param groupId - Group chat ID (e.g. "972501234567-1234567890@g.us")
 * @param participantId - Participant chat ID (e.g. "972501234567@c.us")
 */
export async function addGroupParticipant(
  groupId: string,
  participantId: string
): Promise<{ addParticipant: boolean }> {
  return greenApiPost<{ addParticipant: boolean }>("addGroupParticipant", {
    groupId,
    participantChatId: participantId,
  });
}

/**
 * Remove a participant from a WhatsApp group.
 * @param groupId - Group chat ID
 * @param participantId - Participant chat ID to remove
 */
export async function removeGroupParticipant(
  groupId: string,
  participantId: string
): Promise<{ removeParticipant: boolean }> {
  return greenApiPost<{ removeParticipant: boolean }>("removeGroupParticipant", {
    groupId,
    participantChatId: participantId,
  });
}

/**
 * List all WhatsApp groups for this instance.
 */
export async function getGroups(): Promise<GreenApiGroup[]> {
  return greenApiPost<GreenApiGroup[]>("getContacts", {});
}

/**
 * Get detailed info for a specific WhatsApp group.
 * @param groupId - Group chat ID
 */
export async function getGroupInfo(
  groupId: string
): Promise<GreenApiGroup> {
  return greenApiPost<GreenApiGroup>("getGroupData", {
    groupId,
  });
}
