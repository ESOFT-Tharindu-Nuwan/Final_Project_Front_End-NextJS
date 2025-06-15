"use client";

import { useAppContext } from "@/app/providers";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Upload, Camera, Info, Globe, ArrowLeft, CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { Language, translations, languageNames } from "@/lib/constants";

export default function DiseaseDetectionPage() {
    const { language, setLanguage } = useAppContext();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const t = translations.disease[language as Language];

    const handleFileSelect = (file: File) => {
        if (file && file.type.startsWith("image/")) {
            setSelectedFile(file)
        }
    }

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true)
        } else if (e.type === "dragleave") {
            setDragActive(false)
        }
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileSelect(e.dataTransfer.files[0])
        }
    }

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleFileSelect(e.target.files[0])
        }
    }

    const handleUpload = async () => {
        if (!selectedFile) return

        setIsUploading(true)
        // TODO - AI Analysis
        await new Promise((resolve) => setTimeout(resolve, 3000))
        setIsUploading(false)
        // TODO - AI Result
    }

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
            <main className="container mx-auto px-4 py-8 max-w-4xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">{t.title}</h1>
                    <p className="text-lg text-green-700 max-w-2xl mx-auto">{t.subtitle}</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Instructions Card */}
                    <Card className="lg:col-span-1 bg-white/80 border-green-200">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-green-900 flex items-center gap-2">
                                <Camera className="h-5 w-5" />
                                Instructions
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 ml-auto">
                                                <Info className="h-4 w-4 text-green-600" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent className="max-w-xs bg-green-900 text-green-50">
                                            <div className="space-y-2">
                                                <p className="font-semibold">{t.photoTips}</p>
                                                <ul className="text-sm space-y-1">
                                                    {t.tipsContent.map((tip, index) => (
                                                        <li key={index} className="flex items-start gap-2">
                                                            <span className="text-green-300 mt-1">•</span>
                                                            {tip}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3">
                                {t.instructions.map((instruction, index) => (
                                    <li key={index} className="flex items-start gap-3 text-green-700">
                                        <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-semibold mt-0.5">
                                            {index + 1}
                                        </span>
                                        <span>{instruction}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Upload Card */}
                    <Card className="lg:col-span-2 bg-white/80 border-green-200">
                        <CardContent className="p-8">
                            <div className="space-y-6">
                                {/* File Upload Area */}
                                <div
                                    className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${dragActive
                                            ? "border-green-500 bg-green-50"
                                            : selectedFile
                                                ? "border-green-400 bg-green-50"
                                                : "border-green-300 hover:border-green-400 hover:bg-green-50"
                                        }`}
                                    onDragEnter={handleDrag}
                                    onDragLeave={handleDrag}
                                    onDragOver={handleDrag}
                                    onDrop={handleDrop}
                                >
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileInputChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        aria-label={t.selectFile}
                                    />

                                    <div className="space-y-4">
                                        {selectedFile ? (
                                            <div className="space-y-4">
                                                <CheckCircle className="h-16 w-16 text-green-600 mx-auto" />
                                                <div>
                                                    <p className="text-lg font-semibold text-green-900">{t.fileSelected}</p>
                                                    <p className="text-green-700">{selectedFile.name}</p>
                                                    <p className="text-sm text-green-600">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="space-y-4">
                                                <Upload className="h-16 w-16 text-green-600 mx-auto" />
                                                <div>
                                                    <p className="text-lg font-semibold text-green-900">{t.uploadArea}</p>
                                                    <p className="text-green-700 mt-2">{t.supportedFormats}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Preview */}
                                {selectedFile && (
                                    <div className="relative aspect-video bg-green-50 rounded-lg overflow-hidden border border-green-200">
                                        <Image
                                            src={URL.createObjectURL(selectedFile) || "/placeholder.svg"}
                                            alt="Selected cassava leaf"
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                )}

                                {/* Upload Button */}
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Button
                                        onClick={handleUpload}
                                        disabled={!selectedFile || isUploading}
                                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isUploading ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                {t.uploading}
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <Camera className="h-5 w-5" />
                                                {t.uploadButton}
                                            </div>
                                        )}
                                    </Button>

                                    {selectedFile && (
                                        <Button
                                            variant="outline"
                                            onClick={() => {
                                                setSelectedFile(null)
                                                if (fileInputRef.current) {
                                                    fileInputRef.current.value = ""
                                                }
                                            }}
                                            className="border-green-300 text-green-700 hover:bg-green-50"
                                        >
                                            Clear
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Results Section (placeholder for when analysis is complete) */}
                {isUploading && (
                    <Card className="mt-8 bg-blue-50 border-blue-200">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                                <div>
                                    <p className="font-semibold text-blue-900">AI Analysis in Progress</p>
                                    <p className="text-blue-700">Our AI is examining your cassava leaf for diseases...</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </main>
        </div>
    )
}
