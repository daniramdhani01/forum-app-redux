export const updateVotes = (target, voteKey, oppositeVoteKey, userId, voteExist) => ({
  ...target,
  [voteKey]: voteExist
    ? target[voteKey].filter((id) => id !== userId)
    : [...target[voteKey], userId],
  [oppositeVoteKey]: target[oppositeVoteKey].filter((id) => id !== userId)
});