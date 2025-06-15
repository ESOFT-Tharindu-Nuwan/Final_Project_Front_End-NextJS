"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ArrowLeft, Globe, Info, BarChart3, Leaf, Calendar, Droplets, Thermometer } from "lucide-react"
import { Language, translations, languageNames } from "@/lib/constants";
import Link from "next/link"
import { useAppContext } from "../providers"

interface FormData {
    plantHeight: string
    stemDiameter: string
    leafCount: string
    plantAge: string
    soilMoisture: string
    temperature: string
    fertilizer: string
    plantingDensity: string
    variety: string
}

export default function YieldPredictionPage() {
    const { language, setLanguage } = useAppContext();
    const [isPredicting, setIsPredicting] = useState(false)
    const [formData, setFormData] = useState<FormData>({
        plantHeight: "",
        stemDiameter: "",
        leafCount: "",
        plantAge: "",
        soilMoisture: "",
        temperature: "",
        fertilizer: "",
        plantingDensity: "",
        variety: "",
    })
    const [errors, setErrors] = useState<Partial<FormData>>({})

    const t = translations.yeild[language as Language];

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: "" }))
        }
    }

    const validateForm = () => {
        const newErrors: Partial<FormData> = {}

        // Required numeric fields
        const numericFields: (keyof FormData)[] = [
            "plantHeight",
            "stemDiameter",
            "leafCount",
            "plantAge",
            "temperature",
            "plantingDensity",
        ]

        numericFields.forEach((field) => {
            if (!formData[field]) {
                newErrors[field] = t.required
            } else if (isNaN(Number(formData[field])) || Number(formData[field]) <= 0) {
                newErrors[field] = t.invalidNumber
            }
        })

        // Required select fields
        const selectFields: (keyof FormData)[] = ["soilMoisture", "fertilizer", "variety"]
        selectFields.forEach((field) => {
            if (!formData[field]) {
                newErrors[field] = t.required
            }
        })

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) return

        setIsPredicting(true)
        // Simulate prediction process
        await new Promise((resolve) => setTimeout(resolve, 3000))
        setIsPredicting(false)
        // Here you would typically handle the AI prediction results
    }

    const resetForm = () => {
        setFormData({
            plantHeight: "",
            stemDiameter: "",
            leafCount: "",
            plantAge: "",
            soilMoisture: "",
            temperature: "",
            fertilizer: "",
            plantingDensity: "",
            variety: "",
        })
        setErrors({})
    }

    const FormField = ({
        label,
        field,
        unit,
        description,
        type = "number",
        icon: Icon,
    }: {
        label: string
        field: keyof FormData
        unit: string
        description: string
        type?: string
        icon: React.ComponentType<{ className?: string }>
    }) => (
        <div className="space-y-2">
            <div className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-green-600" />
                <Label htmlFor={field} className="text-green-900 font-medium">
                    {label} ({unit})
                </Label>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
                                <Info className="h-3 w-3 text-green-600" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs bg-green-900 text-green-50">
                            <p className="text-sm">{description}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            <Input
                id={field}
                type={type}
                value={formData[field]}
                onChange={(e) => handleInputChange(field, e.target.value)}
                className={`${errors[field] ? "border-red-500" : "border-green-300"} focus:border-green-500`}
                placeholder={`Enter ${label.toLowerCase()}`}
            />
            {errors[field] && <p className="text-sm text-red-600">{errors[field]}</p>}
        </div>
    )

    const SelectField = ({
        label,
        field,
        description,
        options,
        icon: Icon,
    }: {
        label: string
        field: keyof FormData
        description: string
        options: Record<string, string>
        icon: React.ComponentType<{ className?: string }>
    }) => (
        <div className="space-y-2">
            <div className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-green-600" />
                <Label htmlFor={field} className="text-green-900 font-medium">
                    {label}
                </Label>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
                                <Info className="h-3 w-3 text-green-600" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs bg-green-900 text-green-50">
                            <p className="text-sm">{description}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            <Select value={formData[field]} onValueChange={(value) => handleInputChange(field, value)}>
                <SelectTrigger className={`${errors[field] ? "border-red-500" : "border-green-300"} focus:border-green-500`}>
                    <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
                </SelectTrigger>
                <SelectContent>
                    {Object.entries(options).map(([key, value]) => (
                        <SelectItem key={key} value={key}>
                            {value}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {errors[field] && <p className="text-sm text-red-600">{errors[field]}</p>}
        </div>
    )

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-amber-50 to-green-100">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-green-50/80 backdrop-blur-md border-b border-green-200">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link
                            href="/"
                            className="flex items-center space-x-2 text-green-700 hover:text-green-800 transition-colors"
                        >
                            <ArrowLeft className="h-5 w-5" />
                            <span className="font-medium">{t.backToHome}</span>
                        </Link>
                    </div>

                    {/* Language Switcher */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="hover:bg-green-100 text-green-700">
                                <Globe className="h-4 w-4 mr-1" />
                                {languageNames[language]}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-white border-green-200">
                            {Object.entries(languageNames).map(([code, name]) => (
                                <DropdownMenuItem
                                    key={code}
                                    onClick={() => setLanguage(code as Language)}
                                    className="hover:bg-green-50 text-green-700"
                                >
                                    {name}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8 max-w-6xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">{t.title}</h1>
                    <p className="text-lg text-green-700 max-w-2xl mx-auto">{t.subtitle}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Plant Measurements */}
                    <Card className="bg-white/80 border-green-200">
                        <CardHeader>
                            <CardTitle className="text-green-900 flex items-center gap-2">
                                <Leaf className="h-5 w-5" />
                                {t.plantMetrics}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <FormField
                                    label={t.plantHeight}
                                    field="plantHeight"
                                    unit={t.cm}
                                    description={t.plantHeightDesc}
                                    icon={BarChart3}
                                />
                                <FormField
                                    label={t.stemDiameter}
                                    field="stemDiameter"
                                    unit={t.cm}
                                    description={t.stemDiameterDesc}
                                    icon={BarChart3}
                                />
                                <FormField label={t.leafCount} field="leafCount" unit="" description={t.leafCountDesc} icon={Leaf} />
                                <FormField
                                    label={t.plantAge}
                                    field="plantAge"
                                    unit={t.months}
                                    description={t.plantAgeDesc}
                                    icon={Calendar}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Environmental Factors */}
                    <Card className="bg-white/80 border-green-200">
                        <CardHeader>
                            <CardTitle className="text-green-900 flex items-center gap-2">
                                <Thermometer className="h-5 w-5" />
                                {t.environmentalFactors}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <SelectField
                                    label={t.soilMoisture}
                                    field="soilMoisture"
                                    description={t.soilMoistureDesc}
                                    options={t.moistureLevels}
                                    icon={Droplets}
                                />
                                <FormField
                                    label={t.temperature}
                                    field="temperature"
                                    unit={t.celsius}
                                    description={t.temperatureDesc}
                                    icon={Thermometer}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Farming Practices */}
                    <Card className="bg-white/80 border-green-200">
                        <CardHeader>
                            <CardTitle className="text-green-900 flex items-center gap-2">
                                <BarChart3 className="h-5 w-5" />
                                {t.farmingPractices}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <SelectField
                                    label={t.fertilizer}
                                    field="fertilizer"
                                    description={t.fertilizerDesc}
                                    options={t.fertilizerTypes}
                                    icon={Leaf}
                                />
                                <FormField
                                    label={t.plantingDensity}
                                    field="plantingDensity"
                                    unit={t.plantsPerHectare}
                                    description={t.plantingDensityDesc}
                                    icon={BarChart3}
                                />
                                <SelectField
                                    label={t.variety}
                                    field="variety"
                                    description={t.varietyDesc}
                                    options={t.varieties}
                                    icon={Leaf}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            type="submit"
                            disabled={isPredicting}
                            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
                        >
                            {isPredicting ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    {t.predicting}
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <BarChart3 className="h-5 w-5" />
                                    {t.predictYield}
                                </div>
                            )}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={resetForm}
                            className="border-green-300 text-green-700 hover:bg-green-50 px-8 py-3 text-lg"
                        >
                            {t.reset}
                        </Button>
                    </div>
                </form>

                {/* Prediction Results (placeholder) */}
                {isPredicting && (
                    <Card className="mt-8 bg-blue-50 border-blue-200">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                                <div>
                                    <p className="font-semibold text-blue-900">AI Prediction in Progress</p>
                                    <p className="text-blue-700">Analyzing your plant data to predict cassava yield...</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </main>
        </div>
    )
}