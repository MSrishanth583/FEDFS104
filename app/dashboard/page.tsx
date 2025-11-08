"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getActivities, getEvents, registerForActivity, unregisterFromActivity } from "@/lib/mock-data"
import { Calendar, Clock, MapPin, Users, LogOut, Trophy, BookOpen, Music, Heart, CheckCircle2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function DashboardPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [user, setUser] = useState<any>(null)
  const [activities, setActivities] = useState<any[]>([])
  const [events, setEvents] = useState<any[]>([])

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
    } else {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      setActivities(getActivities())
      setEvents(getEvents())
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  const handleRegister = (activityId: string) => {
    if (!user) return

    const result = registerForActivity(user.id, activityId)

    if (result.success) {
      toast({
        title: "Success!",
        description: "You have been registered for this activity",
      })
      setActivities(getActivities())
      const updatedUser = JSON.parse(localStorage.getItem("user") || "{}")
      setUser(updatedUser)
    } else {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      })
    }
  }

  const handleUnregister = (activityId: string) => {
    if (!user) return

    const result = unregisterFromActivity(user.id, activityId)

    if (result.success) {
      toast({
        title: "Success!",
        description: "You have been unregistered from this activity",
      })
      setActivities(getActivities())
      const updatedUser = JSON.parse(localStorage.getItem("user") || "{}")
      setUser(updatedUser)
    } else {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      })
    }
  }

  const isRegistered = (activityId: string) => {
    return user?.registeredActivities?.includes(activityId)
  }

  if (!user) return null

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "sports":
        return <Trophy className="h-5 w-5" />
      case "academic":
        return <BookOpen className="h-5 w-5" />
      case "cultural":
        return <Music className="h-5 w-5" />
      case "social":
        return <Heart className="h-5 w-5" />
      default:
        return <Calendar className="h-5 w-5" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-500"
      case "completed":
        return "bg-green-500"
      case "cancelled":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Student Activities Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Welcome back, {user.name}
              <Badge variant="outline" className="ml-2">
                {user.role}
              </Badge>
              <Badge variant="secondary" className="ml-2">
                <Trophy className="h-3 w-3 mr-1" />
                {user.points || 0} Points
              </Badge>
            </p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="activities" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="activities">Activities</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
          </TabsList>

          <TabsContent value="activities" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {activities.map((activity) => (
                <Card key={activity.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {getActivityIcon(activity.type)}
                        <CardTitle className="text-lg">{activity.title}</CardTitle>
                      </div>
                      <Badge className={getStatusColor(activity.status)}>{activity.status}</Badge>
                    </div>
                    <CardDescription>{activity.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {activity.date}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {activity.time}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {activity.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      {activity.participantCount} / {activity.maxParticipants} participants
                    </div>
                    <div className="pt-2">
                      {isRegistered(activity.id) ? (
                        <Button
                          className="w-full bg-transparent"
                          variant="outline"
                          onClick={() => handleUnregister(activity.id)}
                          disabled={activity.status === "completed"}
                        >
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          Registered
                        </Button>
                      ) : (
                        <Button
                          className="w-full"
                          onClick={() => handleRegister(activity.id)}
                          disabled={
                            activity.status === "completed" || activity.participantCount >= activity.maxParticipants
                          }
                        >
                          {activity.status === "completed"
                            ? "Completed"
                            : activity.participantCount >= activity.maxParticipants
                              ? "Full"
                              : "Register"}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="events" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                    <Calendar className="h-12 w-12 text-muted-foreground/30" />
                  </div>
                  <CardHeader>
                    <CardTitle>{event.title}</CardTitle>
                    <CardDescription>{event.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {event.date} at {event.time}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {event.venue}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      {event.attendees} attendees
                    </div>
                    <Badge variant="outline">{event.category}</Badge>
                    <div className="pt-2">
                      <Button className="w-full">View Details</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
