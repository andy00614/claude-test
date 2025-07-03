"use client";

import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import UserDropdown from "@/components/user-dropdown";
import FeedbackDialog from "@/components/feedback-dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Download, RefreshCw, Palette, Key, QrCode, Hash, Clock, Type } from "lucide-react";
import { RiCodeSSlashLine } from "@remixicon/react";
import { toast } from "sonner";
import QRCode from "qrcode";

export default function ToolsPage() {
  const [jsonInput, setJsonInput] = useState("");
  const [jsonOutput, setJsonOutput] = useState("");
  const [base64Input, setBase64Input] = useState("");
  const [base64Output, setBase64Output] = useState("");
  const [base64Mode, setBase64Mode] = useState<"encode" | "decode">("encode");
  const [urlInput, setUrlInput] = useState("");
  const [urlOutput, setUrlOutput] = useState("");
  const [urlMode, setUrlMode] = useState<"encode" | "decode">("encode");
  const [qrText, setQrText] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(12);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [selectedColor, setSelectedColor] = useState("#3B82F6");
  const [timestampInput, setTimestampInput] = useState("");
  const [timestampOutput, setTimestampOutput] = useState("");
  const [timestampMode, setTimestampMode] = useState<"to" | "from">("to");
  const [textInput, setTextInput] = useState("");
  const [textStats, setTextStats] = useState({ chars: 0, words: 0, lines: 0 });

  const formatJSON = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonOutput(JSON.stringify(parsed, null, 2));
    } catch {
      toast.error("Invalid JSON format");
    }
  };

  const handleBase64 = () => {
    try {
      if (base64Mode === "encode") {
        setBase64Output(btoa(base64Input));
      } else {
        setBase64Output(atob(base64Input));
      }
    } catch {
      toast.error("Invalid input for Base64 operation");
    }
  };

  const handleURL = () => {
    try {
      if (urlMode === "encode") {
        setUrlOutput(encodeURIComponent(urlInput));
      } else {
        setUrlOutput(decodeURIComponent(urlInput));
      }
    } catch {
      toast.error("Invalid URL format");
    }
  };

  const generateQR = async () => {
    try {
      const qrDataUrl = await QRCode.toDataURL(qrText, {
        width: 256,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
      setQrCode(qrDataUrl);
    } catch {
      toast.error("Failed to generate QR code");
    }
  };

  const generatePassword = () => {
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = includeSymbols ? "!@#$%^&*()_+-=[]{}|;:,.<>?" : "";
    
    const chars = lowercase + uppercase + numbers + symbols;
    let result = "";
    
    for (let i = 0; i < passwordLength; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    setPassword(result);
  };

  const handleTimestamp = () => {
    try {
      if (timestampMode === "to") {
        const timestamp = Math.floor(new Date(timestampInput).getTime() / 1000);
        setTimestampOutput(timestamp.toString());
      } else {
        const date = new Date(parseInt(timestampInput) * 1000);
        setTimestampOutput(date.toISOString());
      }
    } catch {
      toast.error("Invalid timestamp format");
    }
  };

  const updateTextStats = (text: string) => {
    setTextInput(text);
    setTextStats({
      chars: text.length,
      words: text.trim() ? text.trim().split(/\s+/).length : 0,
      lines: text.split('\n').length
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const downloadQR = () => {
    if (qrCode) {
      const link = document.createElement('a');
      link.download = 'qrcode.png';
      link.href = qrCode;
      link.click();
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="overflow-hidden px-4 md:px-6 lg:px-8">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger className="-ms-4" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    <RiCodeSSlashLine size={22} aria-hidden="true" />
                    <span className="sr-only">Tools</span>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="line-clamp-1 text-sm">
                    Tools
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <FeedbackDialog />
            <UserDropdown />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 px-4 py-10">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Tools</h2>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">8 Tools Available</Badge>
            </div>
          </div>

      <Tabs defaultValue="json" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
          <TabsTrigger value="json">JSON</TabsTrigger>
          <TabsTrigger value="base64">Base64</TabsTrigger>
          <TabsTrigger value="url">URL</TabsTrigger>
          <TabsTrigger value="qr">QR Code</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="color">Colors</TabsTrigger>
          <TabsTrigger value="timestamp">Timestamp</TabsTrigger>
          <TabsTrigger value="text">Text</TabsTrigger>
        </TabsList>

        <TabsContent value="json" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hash className="h-5 w-5" />
                JSON Formatter
              </CardTitle>
              <CardDescription>
                Format and validate JSON data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="json-input">Input JSON</Label>
                <Textarea
                  id="json-input"
                  placeholder="Paste your JSON here..."
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  className="min-h-32"
                />
              </div>
              <Button onClick={formatJSON} className="w-full">
                Format JSON
              </Button>
              {jsonOutput && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="json-output">Formatted JSON</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(jsonOutput)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <Textarea
                    id="json-output"
                    value={jsonOutput}
                    readOnly
                    className="min-h-32"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="base64" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                Base64 Encoder/Decoder
              </CardTitle>
              <CardDescription>
                Encode and decode Base64 strings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Button
                  variant={base64Mode === "encode" ? "default" : "outline"}
                  onClick={() => setBase64Mode("encode")}
                >
                  Encode
                </Button>
                <Button
                  variant={base64Mode === "decode" ? "default" : "outline"}
                  onClick={() => setBase64Mode("decode")}
                >
                  Decode
                </Button>
              </div>
              <div className="space-y-2">
                <Label htmlFor="base64-input">
                  {base64Mode === "encode" ? "Text to encode" : "Base64 to decode"}
                </Label>
                <Textarea
                  id="base64-input"
                  placeholder={base64Mode === "encode" ? "Enter text..." : "Enter Base64..."}
                  value={base64Input}
                  onChange={(e) => setBase64Input(e.target.value)}
                  className="min-h-32"
                />
              </div>
              <Button onClick={handleBase64} className="w-full">
                {base64Mode === "encode" ? "Encode" : "Decode"}
              </Button>
              {base64Output && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="base64-output">Result</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(base64Output)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <Textarea
                    id="base64-output"
                    value={base64Output}
                    readOnly
                    className="min-h-32"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="url" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hash className="h-5 w-5" />
                URL Encoder/Decoder
              </CardTitle>
              <CardDescription>
                Encode and decode URL components
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Button
                  variant={urlMode === "encode" ? "default" : "outline"}
                  onClick={() => setUrlMode("encode")}
                >
                  Encode
                </Button>
                <Button
                  variant={urlMode === "decode" ? "default" : "outline"}
                  onClick={() => setUrlMode("decode")}
                >
                  Decode
                </Button>
              </div>
              <div className="space-y-2">
                <Label htmlFor="url-input">
                  {urlMode === "encode" ? "URL to encode" : "Encoded URL to decode"}
                </Label>
                <Input
                  id="url-input"
                  placeholder={urlMode === "encode" ? "Enter URL..." : "Enter encoded URL..."}
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                />
              </div>
              <Button onClick={handleURL} className="w-full">
                {urlMode === "encode" ? "Encode" : "Decode"}
              </Button>
              {urlOutput && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="url-output">Result</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(urlOutput)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <Input
                    id="url-output"
                    value={urlOutput}
                    readOnly
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="qr" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="h-5 w-5" />
                QR Code Generator
              </CardTitle>
              <CardDescription>
                Generate QR codes from text or URLs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="qr-input">Text or URL</Label>
                <Input
                  id="qr-input"
                  placeholder="Enter text or URL..."
                  value={qrText}
                  onChange={(e) => setQrText(e.target.value)}
                />
              </div>
              <Button onClick={generateQR} className="w-full">
                Generate QR Code
              </Button>
              {qrCode && (
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <img src={qrCode} alt="QR Code" className="border rounded-lg" />
                  </div>
                  <Button onClick={downloadQR} variant="outline" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download QR Code
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="password" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                Password Generator
              </CardTitle>
              <CardDescription>
                Generate secure passwords
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password-length">Length: {passwordLength}</Label>
                <Input
                  id="password-length"
                  type="range"
                  min="4"
                  max="50"
                  value={passwordLength}
                  onChange={(e) => setPasswordLength(Number(e.target.value))}
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="include-symbols"
                  checked={includeSymbols}
                  onChange={(e) => setIncludeSymbols(e.target.checked)}
                />
                <Label htmlFor="include-symbols">Include symbols</Label>
              </div>
              <Button onClick={generatePassword} className="w-full">
                <RefreshCw className="h-4 w-4 mr-2" />
                Generate Password
              </Button>
              {password && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password-output">Generated Password</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(password)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <Input
                    id="password-output"
                    value={password}
                    readOnly
                    className="font-mono"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="color" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Color Tools
              </CardTitle>
              <CardDescription>
                Color picker and converter
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="color-picker">Color Picker</Label>
                <Input
                  id="color-picker"
                  type="color"
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="h-12"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>HEX</Label>
                  <div className="flex">
                    <Input value={selectedColor} readOnly />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(selectedColor)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <Label>RGB</Label>
                  <div className="flex">
                    <Input
                      value={`rgb(${parseInt(selectedColor.slice(1, 3), 16)}, ${parseInt(selectedColor.slice(3, 5), 16)}, ${parseInt(selectedColor.slice(5, 7), 16)})`}
                      readOnly
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(`rgb(${parseInt(selectedColor.slice(1, 3), 16)}, ${parseInt(selectedColor.slice(3, 5), 16)}, ${parseInt(selectedColor.slice(5, 7), 16)})`)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-lg border" style={{ backgroundColor: selectedColor }}>
                <p className="text-center font-medium" style={{ color: selectedColor === '#000000' ? 'white' : 'black' }}>
                  Preview
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timestamp" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Timestamp Converter
              </CardTitle>
              <CardDescription>
                Convert between timestamps and dates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Button
                  variant={timestampMode === "to" ? "default" : "outline"}
                  onClick={() => setTimestampMode("to")}
                >
                  To Timestamp
                </Button>
                <Button
                  variant={timestampMode === "from" ? "default" : "outline"}
                  onClick={() => setTimestampMode("from")}
                >
                  From Timestamp
                </Button>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timestamp-input">
                  {timestampMode === "to" ? "Date (YYYY-MM-DD or ISO)" : "Unix Timestamp"}
                </Label>
                <Input
                  id="timestamp-input"
                  placeholder={timestampMode === "to" ? "2024-01-01 or 2024-01-01T00:00:00Z" : "1672531200"}
                  value={timestampInput}
                  onChange={(e) => setTimestampInput(e.target.value)}
                />
              </div>
              <Button onClick={handleTimestamp} className="w-full">
                Convert
              </Button>
              {timestampOutput && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="timestamp-output">Result</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(timestampOutput)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <Input
                    id="timestamp-output"
                    value={timestampOutput}
                    readOnly
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="text" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Type className="h-5 w-5" />
                Text Tools
              </CardTitle>
              <CardDescription>
                Text statistics and transformations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="text-input">Text</Label>
                <Textarea
                  id="text-input"
                  placeholder="Enter your text here..."
                  value={textInput}
                  onChange={(e) => updateTextStats(e.target.value)}
                  className="min-h-32"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">{textStats.chars}</p>
                  <p className="text-sm text-muted-foreground">Characters</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{textStats.words}</p>
                  <p className="text-sm text-muted-foreground">Words</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{textStats.lines}</p>
                  <p className="text-sm text-muted-foreground">Lines</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => updateTextStats(textInput.toUpperCase())}
                >
                  UPPERCASE
                </Button>
                <Button
                  variant="outline"
                  onClick={() => updateTextStats(textInput.toLowerCase())}
                >
                  lowercase
                </Button>
                <Button
                  variant="outline"
                  onClick={() => updateTextStats(textInput.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' '))}
                >
                  Title Case
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}