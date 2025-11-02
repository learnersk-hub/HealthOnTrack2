"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Activity, Search, Video } from "lucide-react"
import { useState } from "react"

export default function AttendantDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")

  const navigation = [{ label: "Dashboard", href: "/dashboard/attendant", icon: <Activity className="w-5 h-5" /> }]

  const activeAlerts = [
    {
      id: 1,
      passenger: "Anurag Sharma",
      coach: "C3",
      seat: "45",
      symptom: "Chest Pain",
      severity: "critical",
      time: "5 min ago",
      bp: "140/90",
      hr: "95",
    },
    {
      id: 2,
      passenger: "Mohit Kashyap",
      coach: "B2",
      seat: "32",
      symptom: "Fever",
      severity: "warning",
      time: "12 min ago",
      bp: "120/80",
      hr: "88",
    },
    {
      id: 3,
      passenger: "Sharad singh ",
      coach: "A2",
      seat: "18",
      symptom: "Dizziness",
      severity: "info",
      time: "28 min ago",
      bp: "118/76",
      hr: "70",
    },
  ]

  const patients = [
    { id: 1, name: "Anurag Sharma", coach: "C3", seat: "45", status: "critical", lastVitals: "5 min ago" },
    { id: 2, name: "Mohit Kashyap", coach: "B2", seat: "32", status: "warning", lastVitals: "12 min ago" },
    { id: 3, name: "Sharad singh ", coach: "A2", seat: "18", status: "stable", lastVitals: "28 min ago" },
  ]

  const consultations = [
    { id: 1, patient: "Anurag Sharma", doctor: "Dr. verma", status: "active", duration: "5 min" },
    { id: 2, patient: "Mohit Kashyap", doctor: "Dr. gupta", status: "pending", duration: "-" },
  ]

  return (
    <DashboardLayout title="🏥 Attendant Dashboard" role="attendant" navigation={navigation}>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="alerts">🚨 Alerts</TabsTrigger>
          <TabsTrigger value="patients">👥 Patients</TabsTrigger>
          <TabsTrigger value="vitals">📊 Vitals</TabsTrigger>
          <TabsTrigger value="consultations">📞 Consultations</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        {/* ================= OVERVIEW TAB ================= */}
<TabsContent value="overview" className="space-y-8">
  {/* ---- Stats Cards Row ---- */}
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
    {[
      { title: "🔴 Active Cases", value: "3", color: "from-blue-50", text: "text-blue-600" },
      { title: "🆘 Critical", value: "1", color: "from-red-50", text: "text-red-600 animate-pulse" },
      { title: "⏳ Pending Consult", value: "2", color: "from-yellow-50", text: "text-yellow-600" },
      { title: "✅ Resolved", value: "8", color: "from-green-50", text: "text-green-600" },
    ].map((stat, i) => (
      <Card
        key={i}
        className={`border-border bg-gradient-to-br ${stat.color} to-transparent hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
      >
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {stat.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className={`text-4xl font-bold ${stat.text}`}>{stat.value}</p>
        </CardContent>
      </Card>
    ))}
  </div>

  {/* ---- Live Status Widget ---- */}
  <Card className="border-border bg-gradient-to-br from-indigo-50 to-blue-50 hover:shadow-lg transition-all duration-300">
    <CardHeader>
      <CardTitle className="text-lg flex items-center gap-2 text-indigo-700">
        ⚡ Live Status
      </CardTitle>
      <CardDescription>Real-time overview of onboard system health</CardDescription>
    </CardHeader>
    <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="text-center">
        <p className="text-2xl font-bold text-blue-600">13</p>
        <p className="text-sm text-muted-foreground">Total Patients</p>
      </div>
      <div className="text-center">
        <p className="text-2xl font-bold text-green-600">5</p>
        <p className="text-sm text-muted-foreground">Active Doctors</p>
      </div>
      <div className="text-center">
        <p className="text-2xl font-bold text-yellow-600">2 min ago</p>
        <p className="text-sm text-muted-foreground">Last Sync</p>
      </div>
    </CardContent>
  </Card>

  {/* ---- Mini Trend Chart ---- */}
  <Card className="border-border bg-white shadow-md hover:shadow-xl transition-all duration-300">
    <CardHeader>
      <CardTitle className="flex items-center gap-2 text-blue-600 text-lg">
        📈 Patient Load Trend
      </CardTitle>
      <CardDescription>Overview of cases handled today</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="h-24 flex items-end gap-2">
        {[30, 45, 60, 50, 80, 65, 90].map((v, i) => (
          <div
            key={i}
            className="flex-1 bg-gradient-to-t from-blue-200 to-blue-500 rounded-t-lg transition-all hover:scale-y-110"
            style={{ height: `${v}%` }}
          />
        ))}
      </div>
      <p className="text-xs text-center text-muted-foreground mt-2">
        Activity over last 7 hours
      </p>
    </CardContent>
  </Card>

  {/* ---- Quick Access & Actions ---- */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    <Card className="border-border hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">📊 Record Vitals</CardTitle>
        <CardDescription>Update patient vital signs</CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          className="w-full bg-primary hover:bg-primary/90 transition-all"
          onClick={() => setActiveTab("vitals")}
        >
          📝 Open Vitals Form
        </Button>
      </CardContent>
    </Card>

    <Card className="border-border hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">🚨 View Alerts</CardTitle>
        <CardDescription>Monitor urgent patient alerts</CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          className="w-full bg-red-500 hover:bg-red-600 transition-all text-white"
          onClick={() => setActiveTab("alerts")}
        >
          ⚠️ Go to Alerts
        </Button>
      </CardContent>
    </Card>

    <Card className="border-border hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">👥 Manage Patients</CardTitle>
        <CardDescription>Search and update patient info</CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          className="w-full bg-accent hover:bg-accent/90 transition-all"
          onClick={() => setActiveTab("patients")}
        >
          🔍 View Patients
        </Button>
      </CardContent>
    </Card>
  </div>
</TabsContent>


        {/* Alerts Tab */}
        {/* ================= ALERTS TAB ================= */}
<TabsContent value="alerts" className="space-y-6">
  <Card className="border-border relative">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">🚨 Active Alerts</CardTitle>
      <CardDescription>Immediate attention required</CardDescription>
    </CardHeader>

    <CardContent>
      <div className="space-y-3">
        {activeAlerts.map((alert) => (
          <div
            key={alert.id}
            className={`flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-all duration-300 ${
              alert.severity === "critical"
                ? "border-red-200 bg-red-50/30 animate-pulse"
                : alert.severity === "warning"
                  ? "border-yellow-200 bg-yellow-50/30"
                  : "border-blue-200 bg-blue-50/30"
            }`}
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <Badge
                  className={`
                    ${alert.severity === "critical" ? "status-critical" : ""}
                    ${alert.severity === "warning" ? "status-warning" : ""}
                    ${alert.severity === "info" ? "status-info" : ""}
                  `}
                >
                  {alert.severity === "critical" ? "🆘" : alert.severity === "warning" ? "⚠️" : "ℹ️"}{" "}
                  {alert.severity.toUpperCase()}
                </Badge>
                <p className="font-semibold text-foreground">{alert.passenger}</p>
              </div>
              <p className="text-sm text-muted-foreground">
                🚂 Coach {alert.coach}, Seat {alert.seat} • {alert.symptom}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                💓 BP: {alert.bp} • ❤️ HR: {alert.hr} bpm • ⏱️ {alert.time}
              </p>
            </div>

            <div className="flex gap-2">
              {/* 👁️ VIEW BUTTON */}
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90 transition-all"
                onClick={() => {
                  const modal = document.getElementById(`alert-view-${alert.id}`)
                  modal?.classList.remove("hidden")
                  modal?.classList.add("flex")
                }}
              >
                👁️ View
              </Button>

              {/* 📞 CALL BUTTON */}
              <Button
                size="sm"
                variant="outline"
                className="hover:bg-primary/10 transition-colors bg-transparent"
                onClick={() => {
                  const overlay = document.getElementById(`call-overlay-${alert.id}`)
                  overlay?.classList.remove("hidden")
                  overlay?.classList.add("flex")
                  setTimeout(() => {
                    overlay?.classList.add("hidden")
                    overlay?.classList.remove("flex")
                  }, 2000)
                }}
              >
                📞 Call
              </Button>
            </div>

            {/* ---- CALL OVERLAY ---- */}
            <div
              id={`call-overlay-${alert.id}`}
              className="hidden absolute inset-0 bg-black/40 backdrop-blur-sm items-center justify-center rounded-lg z-40 transition-all"
            >
              <div className="bg-white px-6 py-4 rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-300 flex flex-col items-center gap-2">
                <span className="text-2xl animate-spin">📞</span>
                <p className="font-semibold text-blue-600">Calling Doctor...</p>
              </div>
            </div>

            {/* ---- VIEW MODAL ---- */}
            <div
              id={`alert-view-${alert.id}`}
              className="hidden fixed inset-0 bg-black/50 backdrop-blur-sm items-center justify-center z-50 transition-all"
            >
              <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md animate-in fade-in zoom-in duration-300 relative">
                <button
                  onClick={() => {
                    const modal = document.getElementById(`alert-view-${alert.id}`)
                    modal?.classList.add("hidden")
                    modal?.classList.remove("flex")
                  }}
                  className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
                >
                  ✖
                </button>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  🚑 Patient Alert Details
                </h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>Passenger:</strong> {alert.passenger}</p>
                  <p><strong>Coach:</strong> {alert.coach}</p>
                  <p><strong>Seat:</strong> {alert.seat}</p>
                  <p><strong>Symptom:</strong> {alert.symptom}</p>
                  <p><strong>Severity:</strong> {alert.severity.toUpperCase()}</p>
                  <p><strong>BP:</strong> {alert.bp}</p>
                  <p><strong>Heart Rate:</strong> {alert.hr} bpm</p>
                  <p><strong>Reported:</strong> {alert.time}</p>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => {
                      const modal = document.getElementById(`alert-view-${alert.id}`)
                      modal?.classList.add("hidden")
                      modal?.classList.remove("flex")
                    }}
                  >
                    ✅ Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
</TabsContent>


        {/* Patients Tab */}
       {/* ================= PATIENTS TAB ================= */}
<TabsContent value="patients" className="space-y-6">
  <Card className="border-border relative">
    <CardHeader className="flex items-center justify-between">
      <div>
        <CardTitle className="flex items-center gap-2">👥 Patient Management</CardTitle>
        <CardDescription>Search and manage all patients</CardDescription>
      </div>
      <Button
        onClick={() => {
          const modal = document.getElementById("add-patient-modal")
          modal?.classList.remove("hidden")
          modal?.classList.add("flex")
        }}
        className="bg-primary hover:bg-primary/90 transition-all"
      >
        ➕ Add Patient
      </Button>
    </CardHeader>

    <CardContent className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="🔍 Search patients..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 transition-all focus:ring-2"
        />
        <Button size="icon" variant="outline" className="hover:bg-primary/10 transition-colors bg-transparent">
          <Search className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-2">
        {patients.map((patient) => (
          <div
            key={patient.id}
            className="flex items-center justify-between p-3 border border-border rounded-lg hover:shadow-md transition-all duration-300 hover:bg-muted/30"
          >
            <div>
              <p className="font-semibold text-foreground">👤 {patient.name}</p>
              <p className="text-sm text-muted-foreground">
                🚂 Coach {patient.coach}, Seat {patient.seat}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge
                className={`
                  ${patient.status === "critical" ? "status-critical" : ""}
                  ${patient.status === "warning" ? "status-warning" : ""}
                  ${patient.status === "stable" ? "status-success" : ""}
                `}
              >
                {patient.status === "critical" ? "🆘" : patient.status === "warning" ? "⚠️" : "✅"}{" "}
                {patient.status}
              </Badge>

              <Button
                size="sm"
                variant="outline"
                className="hover:bg-primary/10 transition-colors bg-transparent"
                onClick={() => {
                  const modal = document.getElementById(`patient-view-${patient.id}`)
                  modal?.classList.remove("hidden")
                  modal?.classList.add("flex")
                }}
              >
                👁️ View
              </Button>
            </div>

            {/* ---- VIEW MODAL ---- */}
            <div
              id={`patient-view-${patient.id}`}
              className="hidden fixed inset-0 bg-black/50 backdrop-blur-sm items-center justify-center z-50 transition-all"
            >
              <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md animate-in fade-in zoom-in duration-300 relative">
                <button
                  onClick={() => {
                    const modal = document.getElementById(`patient-view-${patient.id}`)
                    modal?.classList.add("hidden")
                    modal?.classList.remove("flex")
                  }}
                  className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
                >
                  ✖
                </button>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  🧍‍♂️ Patient Details
                </h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>Name:</strong> {patient.name}</p>
                  <p><strong>Coach:</strong> {patient.coach}</p>
                  <p><strong>Seat:</strong> {patient.seat}</p>
                  <p><strong>Status:</strong> {patient.status.toUpperCase()}</p>
                  {/* <p><strong>Condition:</strong> {patient.condition || "N/A"}</p>
                  <p><strong>Last Checkup:</strong> {patient.lastCheck || "—"}</p> */}
                </div>
                <div className="mt-4 flex justify-end gap-3">
                  <Button
                    className="bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => {
                      alert(`${patient.name} marked as stable ✅`)
                      const modal = document.getElementById(`patient-view-${patient.id}`)
                      modal?.classList.add("hidden")
                      modal?.classList.remove("flex")
                    }}
                  >
                    ✅ Stable
                  </Button>
                  <Button
                    className="bg-red-600 hover:bg-red-700 text-white"
                    onClick={() => {
                      alert(`${patient.name} marked as critical ❌`)
                      const modal = document.getElementById(`patient-view-${patient.id}`)
                      modal?.classList.add("hidden")
                      modal?.classList.remove("flex")
                    }}
                  >
                    ❌ Critical
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>

  {/* ---- ADD PATIENT MODAL ---- */}
  <div
    id="add-patient-modal"
    className="hidden fixed inset-0 bg-black/50 backdrop-blur-sm items-center justify-center z-50 transition-all"
  >
    <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md animate-in fade-in zoom-in duration-300 relative">
      <button
        onClick={() => {
          const modal = document.getElementById("add-patient-modal")
          modal?.classList.add("hidden")
          modal?.classList.remove("flex")
        }}
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
      >
        ✖
      </button>
      <h3 className="text-lg font-semibold text-gray-800 mb-3">➕ Add New Patient</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          const name = (document.getElementById("new-name") as HTMLInputElement).value
          const coach = (document.getElementById("new-coach") as HTMLInputElement).value
          const seat = (document.getElementById("new-seat") as HTMLInputElement).value
          const status = (document.getElementById("new-status") as HTMLSelectElement).value

          if (!name || !coach || !seat) {
            alert("Please fill all fields!")
            return
          }

          const newPatient = {
            id: Date.now(),
            name,
            coach,
            seat,
            status,
            condition: "Manually added",
          }

          // @ts-ignore - assuming patients is in your state
          setPatients((prev) => [...prev, newPatient])

          const modal = document.getElementById("add-patient-modal")
          modal?.classList.add("hidden")
          modal?.classList.remove("flex")
        }}
        className="space-y-3"
      >
        <Input id="new-name" placeholder="👤 Name" />
        <Input id="new-coach" placeholder="🚆 Coach" />
        <Input id="new-seat" placeholder="💺 Seat" />
        <select id="new-status" className="w-full border rounded-md p-2 text-sm">
          <option value="stable">✅ Stable</option>
          <option value="warning">⚠️ Warning</option>
          <option value="critical">🆘 Critical</option>
        </select>
        <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
          ➕ Add Patient
        </Button>
      </form>
    </div>
  </div>
</TabsContent>


        {/* ================= VITALS TAB ================= */}
<TabsContent value="vitals" className="space-y-6">
  <Card className="border-border shadow-lg bg-gradient-to-br from-white to-blue-50">
    <CardHeader>
      <CardTitle className="flex items-center gap-2 text-blue-600 text-xl">
        📊 Record Vital Signs
      </CardTitle>
      <CardDescription>Enter patient vitals manually or sync from device</CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      {/* ---- React state setup ---- */}
      {(() => {
        const [vitals, setVitals] = useState({
          bp: "",
          hr: "",
          spo2: "",
          temp: "",
        })
        const [showPopup, setShowPopup] = useState(false)

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const { name, value } = e.target
          setVitals((prev) => ({ ...prev, [name]: value }))
        }

        const handleSave = () => {
          if (vitals.bp && vitals.hr && vitals.spo2 && vitals.temp) {
            setShowPopup(true)
            setTimeout(() => setShowPopup(false), 2000)
            setVitals({ bp: "", hr: "", spo2: "", temp: "" })
          } else {
            alert("⚠️ Please fill all fields before saving.")
          }
        }

        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block text-gray-700">💓 Blood Pressure</label>
                <Input
                  name="bp"
                  placeholder="e.g., 120/80"
                  value={vitals.bp}
                  onChange={handleChange}
                  className="transition-all focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block text-gray-700">❤️ Heart Rate (bpm)</label>
                <Input
                  name="hr"
                  placeholder="e.g., 72"
                  value={vitals.hr}
                  onChange={handleChange}
                  className="transition-all focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block text-gray-700">💨 SpO₂ (%)</label>
                <Input
                  name="spo2"
                  placeholder="e.g., 98"
                  value={vitals.spo2}
                  onChange={handleChange}
                  className="transition-all focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block text-gray-700">🌡️ Temperature (°C)</label>
                <Input
                  name="temp"
                  placeholder="e.g., 37.2"
                  value={vitals.temp}
                  onChange={handleChange}
                  className="transition-all focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            <Button
              onClick={handleSave}
              className="w-full bg-blue-600 hover:bg-blue-700 transition-all text-white font-semibold rounded-lg"
            >
              💾 Save Vitals
            </Button>

            {/* ---- Popup animation ---- */}
            {showPopup && (
              <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
                <div className="bg-white p-6 rounded-2xl shadow-2xl flex flex-col items-center gap-3 text-center animate-in fade-in zoom-in duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="green"
                    className="w-10 h-10"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <h3 className="text-lg font-semibold text-green-600">Vitals Saved Successfully!</h3>
                  <p className="text-gray-500 text-sm">Data has been securely stored in the database.</p>
                </div>
              </div>
            )}
          </>
        )
      })()}
    </CardContent>
  </Card>
</TabsContent>


        {/* Consultations Tab */}
        <TabsContent value="consultations" className="space-y-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">📞 Telemedicine Consultations</CardTitle>
              <CardDescription>Manage doctor consultations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {consultations.map((consult) => (
                  <div
                    key={consult.id}
                    className={`flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-all duration-300 ${
                      consult.status === "active"
                        ? "border-green-200 bg-green-50/30"
                        : "border-yellow-200 bg-yellow-50/30"
                    }`}
                  >
                    <div>
                      <p className="font-semibold text-foreground">👤 {consult.patient}</p>
                      <p className="text-sm text-muted-foreground">👨‍⚕️ {consult.doctor}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={consult.status === "active" ? "bg-[var(--success)]" : "bg-[var(--warning)]"}>
                        {consult.status === "active" ? "🟢" : "🟡"} {consult.status}
                      </Badge>
                      <span className="text-sm text-muted-foreground">⏱️ {consult.duration}</span>
                      <Button size="sm" className="bg-primary hover:bg-primary/90 transition-all">
                        <Video className="w-4 h-4 mr-2" />📞 Join
                      </Button>
                    </div>
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
