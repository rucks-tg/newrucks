export interface SweepstakeTask {
  id: string
  sweepstakeId: string
  title: string
  description: string
  url: string
}

// Mock tasks data for each sweepstake
const tasksData: SweepstakeTask[] = [
  // Tasks for sw1 (MacBook Pro)
  {
    id: "task1-sw1",
    sweepstakeId: "sw1",
    title: "Share on social media",
    description: "Share this sweepstake on your social media accounts to earn extra entries.",
    url: "https://twitter.com/intent/tweet",
  },
  {
    id: "task2-sw1",
    sweepstakeId: "sw1",
    title: "Watch product video",
    description: "Watch the full MacBook Pro M3 Max product video to earn bonus entries.",
    url: "https://www.youtube.com/watch?v=example",
  },
  {
    id: "task3-sw1",
    sweepstakeId: "sw1",
    title: "Subscribe to newsletter",
    description: "Subscribe to our tech newsletter for additional entries.",
    url: "https://example.com/newsletter",
  },
  {
    id: "task4-sw1",
    sweepstakeId: "sw1",
    title: "Refer a friend",
    description: "Invite a friend to join this sweepstake and earn bonus entries when they sign up.",
    url: "https://example.com/refer",
  },

  // Tasks for sw2 (PlayStation 5)
  {
    id: "task1-sw2",
    sweepstakeId: "sw2",
    title: "Follow on Twitter",
    description: "Follow our Twitter account to earn extra entries.",
    url: "https://twitter.com/playstation",
  },
  {
    id: "task2-sw2",
    sweepstakeId: "sw2",
    title: "Watch gameplay trailer",
    description: "Watch the latest PS5 gameplay trailer to earn bonus entries.",
    url: "https://www.youtube.com/watch?v=example",
  },
  {
    id: "task3-sw2",
    sweepstakeId: "sw2",
    title: "Join gaming community",
    description: "Join our gaming community on Discord for additional entries.",
    url: "https://discord.gg/example",
  },

  // Tasks for sw3 (Amazon Gift Card)
  {
    id: "task1-sw3",
    sweepstakeId: "sw3",
    title: "Subscribe to YouTube channel",
    description: "Subscribe to our YouTube channel to earn extra entries.",
    url: "https://www.youtube.com/channel/example",
  },
  {
    id: "task2-sw3",
    sweepstakeId: "sw3",
    title: "Create wishlist",
    description: "Create an Amazon wishlist and share it with us to earn bonus entries.",
    url: "https://amazon.com/wishlist/create",
  },
  {
    id: "task3-sw3",
    sweepstakeId: "sw3",
    title: "Leave app review",
    description: "Leave a review for our app to earn additional entries.",
    url: "https://example.com/review",
  },
  {
    id: "task4-sw3",
    sweepstakeId: "sw3",
    title: "Daily check-in",
    description: "Check in daily for a week to earn bonus entries.",
    url: "https://example.com/check-in",
  },

  // Tasks for sw4 (Luxury Weekend Getaway)
  {
    id: "task1-sw4",
    sweepstakeId: "sw4",
    title: "Share travel story",
    description: "Share your favorite travel story in the comments to earn extra entries.",
    url: "https://example.com/share-story",
  },
  {
    id: "task2-sw4",
    sweepstakeId: "sw4",
    title: "Follow on Instagram",
    description: "Follow our Instagram account to earn bonus entries.",
    url: "https://instagram.com/example",
  },
  {
    id: "task3-sw4",
    sweepstakeId: "sw4",
    title: "Tag friends",
    description: "Tag 3 friends who would love this getaway to earn additional entries.",
    url: "https://example.com/tag-friends",
  },

  // Tasks for upcoming sweepstakes
  {
    id: "task1-sw5",
    sweepstakeId: "sw5",
    title: "Early bird registration",
    description: "Register early for this upcoming sweepstake to earn bonus entries when it launches.",
    url: "https://example.com/early-registration",
  },
  {
    id: "task1-sw6",
    sweepstakeId: "sw6",
    title: "Notification sign-up",
    description: "Sign up for notifications about this upcoming sweepstake to earn bonus entries.",
    url: "https://example.com/notifications",
  },
]

export const getTasksBySweepstakeId = (sweepstakeId: string): SweepstakeTask[] => {
  return tasksData.filter((task) => task.sweepstakeId === sweepstakeId)
}
