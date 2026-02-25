/**
 * Utility to generate a professional avatar URL based on a name.
 * Uses a heuristic to determine gender as a default fallback.
 */

export const getAvatarUrl = (name: string | null): string => {
  if (!name) return "https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg";

  const femaleNames = [
    // Standard names
    "jane", "mary", "emily", "sarah", "lisa", "anna", "maria", "chloe", "zoe", "sophie",
    "alice", "catherine", "elizabeth", "grace", "rose", "lucy", "emma", "claire",
    // Kenyan/Common names in the region
    "amina", "zuwena", "zawadi", "fatuma", "asha", "halima", "mercy", "joyce", "faith", "purity"
  ];

  const firstName = name.split(' ')[0].toLowerCase();
  
  if (femaleNames.includes(firstName)) {
    return "https://i.pinimg.com/736x/c9/6b/c7/c96bc7ddb1b984a99b859471cd9c158b.jpg";
  }

  // Default / Male avatar
  return "https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg";
};
