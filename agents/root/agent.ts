import { LlmAgent } from "@google/adk";

export const rootAgent = new LlmAgent({
	name: "root_agent",
	model: "gemini-2.5-flash",
	description: "The root agent that coordinates other agents.",
	instruction:
		"You are a helpful and efficient root agent. Your task is to manage and coordinate other specialized agents to accomplish complex tasks effectively.",
});
