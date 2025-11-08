// Mock users data
const mockUsers = [
  {
    id: "1",
    email: "student@university.edu",
    password: "student123",
    name: "John Doe",
    role: "student",
    studentId: "STU001",
    points: 0,
    registeredActivities: [],
  },
  {
    id: "2",
    email: "faculty@university.edu",
    password: "faculty123",
    name: "Dr. Jane Smith",
    role: "faculty",
    department: "Computer Science",
    points: 0,
    registeredActivities: [],
  },
  {
    id: "3",
    email: "admin@university.edu",
    password: "admin123",
    name: "Admin User",
    role: "admin",
    points: 0,
    registeredActivities: [],
  },
]

// Mock activities data
const mockActivities = [
  {
    id: "1",
    title: "Football Practice",
    type: "sports",
    description: "Weekly football practice session for all team members",
    date: "2024-01-15",
    time: "16:00",
    location: "University Stadium",
    participantCount: 25,
    maxParticipants: 30,
    status: "upcoming",
    organizer: "Dr. Jane Smith",
  },
  {
    id: "2",
    title: "Coding Workshop",
    type: "academic",
    description: "Introduction to React and modern web development",
    date: "2024-01-18",
    time: "14:00",
    location: "Computer Lab A",
    participantCount: 45,
    maxParticipants: 50,
    status: "upcoming",
    organizer: "Tech Club",
  },
  {
    id: "3",
    title: "Music Concert",
    type: "cultural",
    description: "Annual university music festival featuring student bands",
    date: "2024-01-20",
    time: "18:00",
    location: "Main Auditorium",
    participantCount: 120,
    maxParticipants: 200,
    status: "upcoming",
    organizer: "Music Department",
  },
  {
    id: "4",
    title: "Charity Run",
    type: "social",
    description: "5K charity run to support local community",
    date: "2024-01-12",
    time: "07:00",
    location: "Campus Grounds",
    participantCount: 85,
    maxParticipants: 100,
    status: "completed",
    organizer: "Student Council",
  },
  {
    id: "5",
    title: "Debate Competition",
    type: "academic",
    description: "Inter-department debate competition on current affairs",
    date: "2024-01-22",
    time: "15:00",
    location: "Lecture Hall 3",
    participantCount: 32,
    maxParticipants: 40,
    status: "upcoming",
    organizer: "Debate Society",
  },
]

// Mock events data
const mockEvents = [
  {
    id: "1",
    title: "University Annual Day",
    description: "Celebration of university achievements and student talents",
    date: "2024-02-01",
    time: "10:00",
    venue: "Main Campus",
    category: "celebration",
    attendees: 500,
    imageUrl: "/university-celebration.jpg",
  },
  {
    id: "2",
    title: "Career Fair 2024",
    description: "Meet top employers and explore career opportunities",
    date: "2024-01-25",
    time: "09:00",
    venue: "Convention Center",
    category: "career",
    attendees: 300,
    imageUrl: "/career-fair.jpg",
  },
  {
    id: "3",
    title: "Tech Symposium",
    description: "Latest trends in technology and innovation",
    date: "2024-02-10",
    time: "13:00",
    venue: "Engineering Block",
    category: "academic",
    attendees: 250,
    imageUrl: "/technology-conference.png",
  },
]

// Mock user authentication
export function authenticateUser(email: string, password: string) {
  const storedUsers = localStorage.getItem("mockUsers")
  const users = storedUsers ? JSON.parse(storedUsers) : mockUsers

  const user = users.find((u: any) => u.email === email && u.password === password)
  if (user) {
    const { password: _, ...userWithoutPassword } = user
    return { success: true, user: userWithoutPassword }
  }
  return { success: false, error: "Invalid credentials" }
}

// Mock user registration
export function registerUser(email: string, password: string, name: string, role: string) {
  const storedUsers = localStorage.getItem("mockUsers")
  const users = storedUsers ? JSON.parse(storedUsers) : mockUsers

  const existingUser = users.find((u: any) => u.email === email)
  if (existingUser) {
    return { success: false, error: "User already exists" }
  }

  const newUser = {
    id: String(users.length + 1),
    email,
    password,
    name,
    role,
    points: 0,
    registeredActivities: [],
    ...(role === "student" ? { studentId: `STU${String(users.length + 1).padStart(3, "0")}` } : {}),
    ...(role === "faculty" ? { department: "General" } : {}),
  }

  users.push(newUser)
  localStorage.setItem("mockUsers", JSON.stringify(users))

  const { password: _, ...userWithoutPassword } = newUser
  return { success: true, user: userWithoutPassword }
}

export function getActivities() {
  const storedActivities = localStorage.getItem("mockActivities")
  if (!storedActivities) {
    localStorage.setItem("mockActivities", JSON.stringify(mockActivities))
    return mockActivities
  }
  return JSON.parse(storedActivities)
}

export function getEvents() {
  const storedEvents = localStorage.getItem("mockEvents")
  if (!storedEvents) {
    localStorage.setItem("mockEvents", JSON.stringify(mockEvents))
    return mockEvents
  }
  return JSON.parse(storedEvents)
}

export function registerForActivity(userId: string, activityId: string) {
  const activities = getActivities()
  const activity = activities.find((a: any) => a.id === activityId)

  if (!activity) {
    return { success: false, error: "Activity not found" }
  }

  if (activity.participantCount >= activity.maxParticipants) {
    return { success: false, error: "Activity is full" }
  }

  if (activity.status !== "upcoming") {
    return { success: false, error: "Cannot register for this activity" }
  }

  // Update activity participant count
  activity.participantCount += 1
  localStorage.setItem("mockActivities", JSON.stringify(activities))

  // Update user's registered activities
  const storedUsers = localStorage.getItem("mockUsers")
  const users = storedUsers ? JSON.parse(storedUsers) : mockUsers
  const user = users.find((u: any) => u.id === userId)

  if (user) {
    if (!user.registeredActivities) {
      user.registeredActivities = []
    }
    user.registeredActivities.push(activityId)
    user.points = (user.points || 0) + 10
    localStorage.setItem("mockUsers", JSON.stringify(users))

    // Update current user in localStorage
    const currentUser = JSON.parse(localStorage.getItem("user") || "{}")
    if (currentUser.id === userId) {
      currentUser.registeredActivities = user.registeredActivities
      currentUser.points = user.points
      localStorage.setItem("user", JSON.stringify(currentUser))
    }
  }

  return { success: true, activity }
}

export function unregisterFromActivity(userId: string, activityId: string) {
  const activities = getActivities()
  const activity = activities.find((a: any) => a.id === activityId)

  if (!activity) {
    return { success: false, error: "Activity not found" }
  }

  // Update activity participant count
  if (activity.participantCount > 0) {
    activity.participantCount -= 1
    localStorage.setItem("mockActivities", JSON.stringify(activities))
  }

  // Update user's registered activities
  const storedUsers = localStorage.getItem("mockUsers")
  const users = storedUsers ? JSON.parse(storedUsers) : mockUsers
  const user = users.find((u: any) => u.id === userId)

  if (user && user.registeredActivities) {
    user.registeredActivities = user.registeredActivities.filter((id: string) => id !== activityId)
    user.points = Math.max(0, (user.points || 0) - 10)
    localStorage.setItem("mockUsers", JSON.stringify(users))

    // Update current user in localStorage
    const currentUser = JSON.parse(localStorage.getItem("user") || "{}")
    if (currentUser.id === userId) {
      currentUser.registeredActivities = user.registeredActivities
      currentUser.points = user.points
      localStorage.setItem("user", JSON.stringify(currentUser))
    }
  }

  return { success: true, activity }
}
