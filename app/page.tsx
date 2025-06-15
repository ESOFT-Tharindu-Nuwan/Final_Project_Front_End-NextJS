"use client";

import { useAppContext } from "./providers";
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Moon, Sun, Globe, Camera, BarChart3, Leaf } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { translations, languageNames } from "@/lib/constants";

export default function LandingPage() {
  type Language = "en" | "si" | "ta"
  const { language, setLanguage, theme, setTheme } = useAppContext();
  const t = translations[language]

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gradient-to-br from-green-950 via-amber-950 to-green-900 text-green-50"
          : "bg-gradient-to-br from-green-50 via-amber-50 to-green-100 text-green-900"
      }`}
    >
      {/* Header */}
      <header
        className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${
          theme === "dark" ? "bg-green-950/80 border-green-800" : "bg-green-50/80 border-green-200"
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-green-600" />
            <h1 className="text-2xl font-bold">{t.appTitle}</h1>
          </div>

          <div className="flex items-center space-x-2">
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`${
                    theme === "dark" ? "hover:bg-green-800 text-green-100" : "hover:bg-green-100 text-green-700"
                  }`}
                >
                  <Globe className="h-4 w-4 mr-1" />
                  {languageNames[language]}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className={`${theme === "dark" ? "bg-green-900 border-green-700" : "bg-white border-green-200"}`}
              >
                {Object.entries(languageNames).map(([code, name]) => (
                  <DropdownMenuItem
                    key={code}
                    onClick={() => setLanguage(code as Language)}
                    className={`${
                      theme === "dark" ? "hover:bg-green-800 text-green-100" : "hover:bg-green-50 text-green-700"
                    }`}
                  >
                    {name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className={`${
                theme === "dark" ? "hover:bg-green-800 text-green-100" : "hover:bg-green-100 text-green-700"
              }`}
            >
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-8 md:py-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Hero Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">{t.tagline}</h2>
              <p
                className={`text-lg md:text-xl leading-relaxed ${
                  theme === "dark" ? "text-green-200" : "text-green-700"
                }`}
              >
                {t.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg">
                {t.getStarted}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className={`px-8 py-3 text-lg border-2 transition-colors ${
                  theme === "dark"
                    ? "border-green-400 text-green-400 hover:bg-green-400 hover:text-green-900"
                    : "border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                }`}
              >
                {t.learnMore}
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="aspect-[4/3] relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Cassava field with healthy plants"
                fill
                className="object-cover"
                priority
              />
              <div
                className={`absolute inset-0 bg-gradient-to-t ${
                  theme === "dark" ? "from-green-900/20 to-transparent" : "from-green-900/10 to-transparent"
                }`}
              />
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 gap-6 mt-16 md:mt-24">
          <Link href="/disease-detection" className="group">
            <Card
              className={`h-full transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 ${
                theme === "dark"
                  ? "bg-green-900/50 border-green-700 hover:border-green-500"
                  : "bg-white/80 border-green-200 hover:border-green-400"
              }`}
            >
              <CardContent className="p-8 text-center space-y-4">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${
                    theme === "dark" ? "bg-green-700" : "bg-green-100"
                  }`}
                >
                  <Camera className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold">{t.diseaseDetection}</h3>
                <p className={`text-lg ${theme === "dark" ? "text-green-200" : "text-green-600"}`}>{t.diseaseDesc}</p>
                <Button className="mt-4 bg-green-600 hover:bg-green-700 text-white group-hover:bg-green-700">
                  {t.getStarted}
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/yield-prediction" className="group">
            <Card
              className={`h-full transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 ${
                theme === "dark"
                  ? "bg-amber-900/50 border-amber-700 hover:border-amber-500"
                  : "bg-white/80 border-amber-200 hover:border-amber-400"
              }`}
            >
              <CardContent className="p-8 text-center space-y-4">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${
                    theme === "dark" ? "bg-amber-700" : "bg-amber-100"
                  }`}
                >
                  <BarChart3 className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="text-2xl font-bold">{t.yieldPrediction}</h3>
                <p className={`text-lg ${theme === "dark" ? "text-amber-200" : "text-amber-600"}`}>{t.yieldDesc}</p>
                <Button className="mt-4 bg-amber-600 hover:bg-amber-700 text-white group-hover:bg-amber-700">
                  {t.getStarted}
                </Button>
              </CardContent>
            </Card>
          </Link>
        </div>
      </main>
    </div>
  )
}