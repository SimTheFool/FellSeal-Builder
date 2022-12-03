declare module "*.tra" {
  const tra: Record<string, string>[];
  export default tra;
}
declare module "*jobs.gdata" {
  const gdata: (Omit<
    import("@domain/Job").Job,
    "actives" | "passives" | "counters"
  > & {
    skills: string[];
  })[];
  export default gdata;
}

declare module "*skills.gdata" {
  const gdata: import("@domain/Skill").Skill[];
  export default gdata;
}
