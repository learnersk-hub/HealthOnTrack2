"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Activity, Video } from "lucide-react"
import { useState } from "react"

export default function DoctorDashboard() {
  const [activeVideo, setActiveVideo] = useState<null | any>(null)
  const [showVitals, setShowVitals] = useState<null | any>(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [prescriptionForm, setPrescriptionForm] = useState({ medication: "", dosage: "", frequency: "" })

  const navigation = [{ label: "Dashboard", href: "/dashboard/doctor", icon: <Activity className="w-5 h-5" /> }]

  const pendingConsultations = [
    {
      id: 1,
      patient: "John Doe",
      train: "Express 12A",
      coach: "C",
      symptom: "Chest Pain",
      severity: "critical",
      waitTime: "5 min",
      bp: "140/90",
      hr: "95",
    },
    {
      id: 2,
      patient: "Jane Smith",
      train: "Express 12A",
      coach: "B",
      symptom: "High Fever",
      severity: "warning",
      waitTime: "12 min",
      bp: "120/80",
      hr: "88",
    },
    {
      id: 3,
      patient: "Mike Johnson",
      train: "Express 12A",
      coach: "D",
      symptom: "Dizziness",
      severity: "info",
      waitTime: "28 min",
      bp: "118/76",
      hr: "70",
    },
  ]

  const activeCalls = [
    { id: 1, patient: "Sarah Wilson", train: "Express 12A", duration: "8 min", bp: "125/82", hr: "75" },
  ]

  const completedCases = [
    { id: 1, patient: "Robert Brown", diagnosis: "Migraine", treatment: "Rest & Medication", date: "2024-10-20" },
    { id: 2, patient: "Emily Davis", diagnosis: "Gastritis", treatment: "Antacids", date: "2024-10-19" },
  ]

  const prescriptions = [
    { id: 1, medication: "Aspirin", dosage: "500mg", frequency: "Twice daily", patient: "John Doe" },
    { id: 2, medication: "Paracetamol", dosage: "650mg", frequency: "Every 6 hours", patient: "Jane Smith" },
  ]



  return (
    <DashboardLayout title="👨‍⚕️ Doctor Portal" role="doctor" navigation={navigation}>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="pending">⏳ Pending</TabsTrigger>
          <TabsTrigger value="calls">📞 Calls</TabsTrigger>
          <TabsTrigger value="completed">✅ Completed</TabsTrigger>
          <TabsTrigger value="prescriptions">💊 Prescriptions</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* ===== LEFT SIDE: Stats + Active Patient ===== */}
            <div className="space-y-4">
              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="border-border bg-gradient-to-br from-yellow-50 to-transparent hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">⏳ Pending</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-[var(--warning)]">3</p>
                  </CardContent>
                </Card>

                <Card className="border-border bg-gradient-to-br from-green-50 to-transparent hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">🟢 In Consultation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-primary">1</p>
                  </CardContent>
                </Card>

                <Card className="border-border bg-gradient-to-br from-blue-50 to-transparent hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">📅 Today's Cases</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-foreground">12</p>
                  </CardContent>
                </Card>

                <Card className="border-border bg-gradient-to-br from-green-50 to-transparent hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">⚡ Avg Response</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-[var(--success)]">2.3 min</p>
                  </CardContent>
                </Card>
              </div>

              {/* Active Patient Snapshot */}
              <Card className="border-green-200 bg-gradient-to-r from-green-50 to-transparent hover:shadow-md transition-all duration-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    👩‍⚕️ Active Patient
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-foreground">Sarah Wilson</p>
                      <p className="text-xs text-muted-foreground">Express 12A • Coach B</p>
                    </div>
                    <Badge className="bg-green-100 text-green-700 animate-pulse">🟢 In Call</Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mt-3">
                    <div className="bg-muted p-2 rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">BP</p>
                      <p className="font-semibold text-foreground">125/82</p>
                    </div>
                    <div className="bg-muted p-2 rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">HR</p>
                      <p className="font-semibold text-foreground">75 bpm</p>
                    </div>
                    <div className="bg-muted p-2 rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">SpO2</p>
                      <p className="font-semibold text-foreground">98%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* ===== RIGHT SIDE: Chart + Activity ===== */}
            <div className="col-span-2 space-y-4">
              {/* Vitals Overview Chart */}
              <Card className="border-border bg-gradient-to-br from-blue-50 to-transparent">
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-muted-foreground">📈 Vitals Overview</CardTitle>
                  <CardDescription>Avg vitals over last 24 hours</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-40 w-full flex items-center justify-center text-muted-foreground">
                    {/* Placeholder for chart - you can integrate recharts here */}
                    <p className="text-sm italic">[Vitals Chart Coming Soon]</p>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="border-border bg-gradient-to-br from-purple-50 to-transparent">
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-muted-foreground">🩺 Recent Activity</CardTitle>
                  <CardDescription>Latest doctor interactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li>✅ Consulted <span className="font-semibold text-foreground">Sarah Wilson</span> 10 mins ago</li>
                    <li>💊 Prescribed <span className="font-semibold text-foreground">Paracetamol</span> for Jane Smith</li>
                    <li>📄 Uploaded report for <span className="font-semibold text-foreground">Robert Brown</span></li>
                    <li>🚨 Reviewed critical alert from Coach C</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>


        {/* ================= PENDING TAB ================= */}
        <TabsContent value="pending" className="space-y-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">⏳ Pending Consultations</CardTitle>
              <CardDescription>Patients waiting for consultation</CardDescription>
            </CardHeader>

            <CardContent>
              {/* ===== NORMAL LIST ===== */}
              {!activeVideo && !showVitals && (
                <div className="space-y-3">
                  {pendingConsultations.map((consultation) => (
                    <div
                      key={consultation.id}
                      className={`flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-all duration-300 ${consultation.severity === "critical"
                          ? "border-red-200 bg-red-50/30 animate-pulse"
                          : consultation.severity === "warning"
                            ? "border-yellow-200 bg-yellow-50/30"
                            : "border-blue-200 bg-blue-50/30"
                        }`}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge
                            className={`${consultation.severity === "critical"
                                ? "status-critical"
                                : consultation.severity === "warning"
                                  ? "status-warning"
                                  : "status-info"
                              }`}
                          >
                            {consultation.severity === "critical"
                              ? "🆘"
                              : consultation.severity === "warning"
                                ? "⚠️"
                                : "ℹ️"}{" "}
                            {consultation.severity.toUpperCase()}
                          </Badge>
                          <p className="font-semibold text-foreground">👤 {consultation.patient}</p>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          🚂 {consultation.train} • Coach {consultation.coach} • {consultation.symptom}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          💓 BP: {consultation.bp} • ❤️ HR: {consultation.hr} bpm • ⏱️ Waiting:{" "}
                          {consultation.waitTime}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="bg-primary hover:bg-primary/90 transition-all"
                          onClick={() => setActiveVideo(consultation)}
                        >
                          <Video className="w-4 h-4 mr-2" /> 📞 Call
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="hover:bg-primary/10 transition-colors bg-transparent"
                          onClick={() => setShowVitals(consultation)}
                        >
                          📊 Vitals
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ===== VIDEO SECTION ===== */}
              {activeVideo && (
                <div className="border border-green-200 bg-green-50/30 rounded-lg p-6 shadow-inner transition-all duration-500 ease-in-out">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">📹 Video Consultation</h3>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600 hover:bg-red-100 transition"
                      onClick={() => setActiveVideo(null)}
                    >
                      ✖ End Call
                    </Button>
                  </div>

                  <div className="aspect-video bg-gradient-to-br from-green-200 to-green-50 rounded-lg flex items-center justify-center mb-4 animate-pulse">
                    <p className="text-sm text-muted-foreground italic">
                      Simulated video stream with {activeVideo.patient}...
                    </p>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    🚂 {activeVideo.train} • Coach {activeVideo.coach}
                  </div>
                </div>
              )}

              {/* ===== VITALS SECTION ===== */}
              {showVitals && (
                <div className="border border-blue-200 bg-blue-50/30 rounded-lg p-6 shadow-inner transition-all duration-500 ease-in-out">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">📊 Live Vitals — {showVitals.patient}</h3>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-blue-600 hover:bg-blue-100 transition"
                      onClick={() => setShowVitals(null)}
                    >
                      ✖ Close
                    </Button>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-muted rounded-lg p-3 text-center">
                      <p className="text-xs text-muted-foreground">💓 BP</p>
                      <p className="font-semibold">{showVitals.bp}</p>
                    </div>
                    <div className="bg-muted rounded-lg p-3 text-center">
                      <p className="text-xs text-muted-foreground">❤️ HR</p>
                      <p className="font-semibold">{showVitals.hr} bpm</p>
                    </div>
                    <div className="bg-muted rounded-lg p-3 text-center">
                      <p className="text-xs text-muted-foreground">🫁 SpO₂</p>
                      <p className="font-semibold">98%</p>
                    </div>
                  </div>

                  <p className="mt-3 text-sm text-muted-foreground italic">
                    Monitoring live vitals... ⏱️
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>


        {/* ================= CALLS TAB ================= */}
        <TabsContent value="calls" className="space-y-6">
          <Card className="border-border border-green-200 bg-green-50/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">📞 Active Video Consultations</CardTitle>
              <CardDescription>Live calls with real-time vitals and control options</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                {activeCalls.length > 0 ? (
                  activeCalls.map((call) => (
                    <div
                      key={call.id}
                      className="p-4 border border-green-200 rounded-lg bg-gradient-to-r from-green-50 to-transparent hover:shadow-md transition-all duration-300"
                    >
                      {/* Header: Patient Info */}
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="font-semibold text-foreground text-base">👤 {call.patient}</p>
                          <p className="text-sm text-muted-foreground">
                            🚂 {call.train} • Coach {call.coach}
                          </p>
                        </div>
                        <Badge className="bg-green-100 text-green-700 border border-green-300 animate-pulse">
                          🟢 Active • {call.duration}
                        </Badge>
                      </div>

                      {/* Vitals */}
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        <div className="p-2 bg-muted rounded text-center hover:bg-muted/80 transition-colors">
                          <p className="text-xs text-muted-foreground">💓 BP</p>
                          <p className="font-semibold text-foreground">{call.bp}</p>
                        </div>
                        <div className="p-2 bg-muted rounded text-center hover:bg-muted/80 transition-colors">
                          <p className="text-xs text-muted-foreground">❤️ HR</p>
                          <p className="font-semibold text-foreground">{call.hr} bpm</p>
                        </div>
                        <div className="p-2 bg-muted rounded text-center hover:bg-muted/80 transition-colors">
                          <p className="text-xs text-muted-foreground">🫁 SpO₂</p>
                          <p className="font-semibold text-foreground">98%</p>
                        </div>
                      </div>

                      {/* Control Bar */}
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="hover:bg-green-100 transition-colors"
                          >
                            🎤 Mute
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="hover:bg-green-100 transition-colors"
                          >
                            💬 Chat
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="hover:bg-green-100 transition-colors"
                          >
                            📑 Share Report
                          </Button>
                        </div>

                        <Badge className="bg-green-100 text-green-700 border border-green-300">
                          Live • Video Feed
                        </Badge>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="flex-1 bg-primary hover:bg-primary/90 transition-all"
                        >
                          <Video className="w-4 h-4 mr-2" /> 📹 Continue
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 bg-transparent hover:bg-destructive/10 text-destructive transition"
                          onClick={() =>
                            setActiveCalls((prev) => prev.filter((c) => c.id !== call.id))
                          }
                        >
                          ❌ End Call
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-muted-foreground py-10">
                    <p className="text-lg font-medium mb-2">No Active Calls</p>
                    <p className="text-sm">All consultations are currently completed or pending.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>


        {/* Completed Tab */}
        <TabsContent value="completed" className="space-y-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">✅ Completed Cases</CardTitle>
              <CardDescription>Case history and reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {completedCases.map((case_) => (
                  <div
                    key={case_.id}
                    className="p-4 border border-border rounded-lg hover:shadow-md transition-all duration-300 bg-gradient-to-r from-green-50 to-transparent"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-foreground">✅ {case_.patient}</p>
                      <p className="text-xs text-muted-foreground">📅 {case_.date}</p>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      <span className="font-medium">🔍 Diagnosis:</span> {case_.diagnosis}
                    </p>
                    <p className="text-sm text-muted-foreground mb-3">
                      <span className="font-medium">💊 Treatment:</span> {case_.treatment}
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full bg-transparent hover:bg-primary/10 transition-colors"
                    >
                      📄 View Report
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Prescriptions Tab */}
        <TabsContent value="prescriptions" className="space-y-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">💊 Generate Prescription</CardTitle>
              <CardDescription>Create new digital prescription</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">💊 Medication</label>
                <Input
                  placeholder="e.g., Aspirin"
                  value={prescriptionForm.medication}
                  onChange={(e) => setPrescriptionForm({ ...prescriptionForm, medication: e.target.value })}
                  className="transition-all focus:ring-2"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">📏 Dosage</label>
                  <Input
                    placeholder="e.g., 500mg"
                    value={prescriptionForm.dosage}
                    onChange={(e) => setPrescriptionForm({ ...prescriptionForm, dosage: e.target.value })}
                    className="transition-all focus:ring-2"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">⏰ Frequency</label>
                  <Input
                    placeholder="e.g., Twice daily"
                    value={prescriptionForm.frequency}
                    onChange={(e) => setPrescriptionForm({ ...prescriptionForm, frequency: e.target.value })}
                    className="transition-all focus:ring-2"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">📝 Notes</label>
                <Textarea placeholder="Additional instructions..." className="min-h-20 transition-all focus:ring-2" />
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90 transition-all">✍️ Generate Prescription</Button>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">📋 Recent Prescriptions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {prescriptions.map((rx) => (
                  <div
                    key={rx.id}
                    className="flex items-center justify-between p-3 border border-border rounded-lg hover:shadow-md transition-all duration-300 bg-gradient-to-r from-blue-50 to-transparent"
                  >
                    <div>
                      <p className="font-semibold text-foreground">💊 {rx.medication}</p>
                      <p className="text-sm text-muted-foreground">
                        {rx.dosage} • {rx.frequency}
                      </p>
                      <p className="text-xs text-muted-foreground">👤 Patient: {rx.patient}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="hover:bg-primary/10 transition-colors bg-transparent"
                    >
                      👁️ View
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}
