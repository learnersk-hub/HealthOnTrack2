"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Activity, Send, Download, Train } from "lucide-react"
import { useState } from "react"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

export default function PassengerDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [emergencyActive, setEmergencyActive] = useState(false)
  const [messages, setMessages] = useState([
    { id: 1, sender: "Dr. Smith", text: "How are you feeling?", time: "2:30 PM" },
    { id: 2, sender: "You", text: "Better, thank you", time: "2:35 PM" },
  ])
  const [messageInput, setMessageInput] = useState("")

  // PNR states
  const [pnr, setPnr] = useState("")
  const [pnrData, setPnrData] = useState<any>(null)
  const [loadingPNR, setLoadingPNR] = useState(false)

  const navigation = [{ label: "Dashboard", href: "/dashboard/passenger", icon: <Activity className="w-5 h-5" /> }]

  const vitals = [
    { label: "Blood Pressure", value: "120/80", status: "normal", emoji: "💓" },
    { label: "Heart Rate", value: "72 bpm", status: "normal", emoji: "❤️" },
    { label: "SpO2", value: "98%", status: "normal", emoji: "💨" },
    { label: "Temperature", value: "37.2°C", status: "normal", emoji: "🌡️" },
  ]

  const prescriptions = [
    { id: 1, medication: "Aspirin", dosage: "500mg", frequency: "Twice daily", date: "2025-10-20" },
    { id: 2, medication: "Vitamin D", dosage: "1000 IU", frequency: "Once daily", date: "2025-10-18" },
  ]

  // Handle chat send
  const handleSendMessage = () => {
    if (messageInput.trim()) {
      setMessages([...messages, { id: messages.length + 1, sender: "You", text: messageInput, time: "Now" }])
      setMessageInput("")
    }
  }

  // Mock PNR Fetch
  const handleFetchPNR = () => {
    if (!pnr.trim()) return
    setLoadingPNR(true)
    setTimeout(() => {
      setPnrData({
        trainName: "Express 12A",
        trainNumber: "12951",
        coach: "C3",
        seat: "45",
        date: "2025-11-02",
        from: "New Delhi",
        to: "Mumbai Central",
        status: "Confirmed",
      })
      setLoadingPNR(false)
    }, 1500)
  }

  // ==================== PDF DOWNLOAD FUNCTION ====================
  const handleDownloadPDF = async (id: number) => {
    const element = document.getElementById(`prescription-${id}`)
    if (!element) return

    const canvas = await html2canvas(element, { scale: 2 })
    const imgData = canvas.toDataURL("image/png")
    const pdf = new jsPDF("p", "mm", "a4")
    const imgProps = pdf.getImageProperties(imgData)
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight)
    pdf.save(`E-Prescription-${id}.pdf`)
  }

  return (
    <DashboardLayout title="🚑 Passenger Portal" role="passenger" navigation={navigation}>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="emergency">🚨 Emergency</TabsTrigger>
          <TabsTrigger value="messages">💬 Messages</TabsTrigger>
          <TabsTrigger value="vitals">📊 Vitals</TabsTrigger>
          <TabsTrigger value="prescriptions">💊 Prescriptions</TabsTrigger>
        </TabsList>

        {/* ================= OVERVIEW TAB ================= */}
        <TabsContent value="overview" className="space-y-6">
          {/* 🔹 PNR Section */}
          <Card className="border-border bg-gradient-to-br from-green-50 to-transparent hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Train className="w-5 h-5 text-green-600" /> PNR Status
              </CardTitle>
              <CardDescription>Enter your PNR to view train and coach details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Enter your 10-digit PNR number"
                  value={pnr}
                  onChange={(e) => setPnr(e.target.value)}
                  maxLength={10}
                  className="transition-all focus:ring-2"
                />
                <Button onClick={handleFetchPNR} disabled={loadingPNR} className="bg-primary hover:bg-primary/90">
                  {loadingPNR ? "Fetching..." : "Fetch Details"}
                </Button>
              </div>

              {pnrData && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fadeIn">
                  <Card className="border border-border bg-muted/30 p-4">
                    <p className="text-sm text-muted-foreground mb-1">Train</p>
                    <p className="font-semibold text-foreground">
                      🚆 {pnrData.trainName} ({pnrData.trainNumber})
                    </p>
                  </Card>
                  <Card className="border border-border bg-muted/30 p-4">
                    <p className="text-sm text-muted-foreground mb-1">Coach & Seat</p>
                    <p className="font-semibold text-foreground">🪑 {pnrData.coach}, Seat {pnrData.seat}</p>
                  </Card>
                  <Card className="border border-border bg-muted/30 p-4">
                    <p className="text-sm text-muted-foreground mb-1">Date</p>
                    <p className="font-semibold text-foreground">📅 {pnrData.date}</p>
                  </Card>
                  <Card className="border border-border bg-muted/30 p-4">
                    <p className="text-sm text-muted-foreground mb-1">From</p>
                    <p className="font-semibold text-foreground">🚉 {pnrData.from}</p>
                  </Card>
                  <Card className="border border-border bg-muted/30 p-4">
                    <p className="text-sm text-muted-foreground mb-1">To</p>
                    <p className="font-semibold text-foreground">🎯 {pnrData.to}</p>
                  </Card>
                  <Card className="border border-border bg-muted/30 p-4">
                    <p className="text-sm text-muted-foreground mb-1">Status</p>
                    <Badge className="bg-[var(--success)] animate-pulse">{pnrData.status}</Badge>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 🔹 Emergency + Chat Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-border bg-gradient-to-br from-red-50 to-transparent hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">🚨 Emergency Assistance</CardTitle>
                <CardDescription>Request immediate medical help</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  className={`w-full transition-all duration-300 ${
                    emergencyActive
                      ? "bg-destructive hover:bg-destructive/90 animate-pulse"
                      : "bg-primary hover:bg-primary/90"
                  }`}
                  onClick={() => setEmergencyActive(!emergencyActive)}
                >
                  {emergencyActive ? "❌ Cancel Request" : "🆘 Request Help"}
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border bg-gradient-to-br from-blue-50 to-transparent hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">💬 Live Chat</CardTitle>
                <CardDescription>Connect with medical staff</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="outline"
                  className="w-full bg-transparent hover:bg-primary/10 transition-colors"
                  onClick={() => setActiveTab("messages")}
                >
                  💭 Start Chat
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ================= EMERGENCY TAB ================= */}
        <TabsContent value="emergency" className="space-y-6">
          <Card className="border-red-200 bg-red-50/40 border text-center py-10">
            <CardHeader>
              <CardTitle className="flex justify-center items-center gap-2 text-lg text-red-600">
                🚨 Emergency Medical Request
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                You’ll be redirected to the detailed emergency form.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => (window.location.href = "/dashboard/passenger/emergency")}
                className="w-full bg-destructive hover:bg-destructive/90 transition-all"
              >
                🆘 Open Emergency Request Form
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ================= MESSAGES TAB ================= */}
        <TabsContent value="messages" className="space-y-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">💬 Live Chat with Medical Staff</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="h-96 border border-border rounded-lg p-4 overflow-y-auto space-y-3 bg-muted/30">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg ${
                        msg.sender === "You"
                          ? "bg-primary text-primary-foreground shadow-md"
                          : "bg-muted text-foreground border border-border shadow-sm"
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <p className="text-xs opacity-70 mt-1">{msg.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <Button onClick={handleSendMessage} size="icon" className="bg-primary hover:bg-primary/90">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ================= VITALS TAB ================= */}
        <TabsContent value="vitals" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>📊 Current Vital Signs</CardTitle>
              <CardDescription>Real-time health monitoring</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {vitals.map((vital) => (
                  <div
                    key={vital.label}
                    className="p-4 border border-border rounded-lg hover:shadow-md transition-all duration-300 bg-gradient-to-br from-blue-50 to-transparent"
                  >
                    <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                      {vital.emoji} {vital.label}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-2xl font-bold">{vital.value}</p>
                      <Badge className="bg-green-500 animate-pulse">{vital.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ================= PRESCRIPTIONS TAB ================= */}
        <TabsContent value="prescriptions" className="space-y-6">
          <Card className="shadow-md border-border bg-gradient-to-br from-blue-50 to-transparent">
            <CardHeader>
              <CardTitle>💊 E-Prescriptions</CardTitle>
              <CardDescription>View and download your medical prescriptions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {prescriptions.map((rx) => (
                <div
                  key={rx.id}
                  id={`prescription-${rx.id}`}
                  className="p-6 border border-border rounded-xl bg-white shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex justify-between items-center mb-4 border-b pb-3">
                    <div>
                      <h3 className="font-bold text-lg">🧑‍⚕️ Dr. A. Sharma</h3>
                      <p className="text-sm text-muted-foreground">MBBS, MD (General Medicine)</p>
                      <p className="text-xs text-muted-foreground">Railway Medical Services</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Prescription ID: RX-{rx.id}</p>
                      <p className="text-xs text-muted-foreground">📅 {rx.date}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4 text-sm">
                    <div><span className="font-semibold">Passenger:</span> Subodh Kushwaha</div>
                    <div><span className="font-semibold">Age:</span> 26</div>
                    <div><span className="font-semibold">PNR:</span> {pnrData ? pnrData.trainNumber : "1295178945"}</div>
                  </div>

                  <div className="border rounded-lg overflow-hidden mb-4">
                    <table className="w-full text-sm">
                      <thead className="bg-blue-100 text-foreground">
                        <tr>
                          <th className="text-left p-2">Medicine</th>
                          <th className="text-left p-2">Dosage</th>
                          <th className="text-left p-2">Frequency</th>
                          <th className="text-left p-2">Duration</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t">
                          <td className="p-2">{rx.medication}</td>
                          <td className="p-2">{rx.dosage}</td>
                          <td className="p-2">{rx.frequency}</td>
                          <td className="p-2">5 days</td>
                        </tr>
                        <tr className="border-t">
                          <td className="p-2">Paracetamol</td>
                          <td className="p-2">650mg</td>
                          <td className="p-2">Twice daily</td>
                          <td className="p-2">3 days</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground">
                      🩺 <strong>Doctor’s Remarks:</strong> Take medicines after meals. Maintain hydration and rest properly.
                    </p>
                  </div>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDownloadPDF(rx.id)}
                    className="flex items-center gap-2 hover:bg-primary/10"
                  >
                    <Download className="w-4 h-4" /> Download PDF
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}
