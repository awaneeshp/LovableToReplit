import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ArrowLeftRight, Calendar, MapPin, Package, Camera, FileText, TestTube, AlertTriangle } from 'lucide-react';

interface AdminSettings {
  enableReturns: boolean;
  enableExchanges: boolean;
  enableCancel: boolean;
  supportSettings: {
    returnOutsideWindow: boolean;
    returnOutOfStock: boolean;
    autoArchiveOnRefund: boolean;
    autoReceiveOnScan: boolean;
    allowExchangeOutOfStock: boolean;
  };
}

interface ExchangeTabProps {
  settings: AdminSettings;
}

export function ExchangeTab({ settings }: ExchangeTabProps) {
  const [testMode, setTestMode] = useState(false);
  const [exchangeDays, setExchangeDays] = useState('30');
  const [multipleExchanges, setMultipleExchanges] = useState(true);
  const [selectedStates, setSelectedStates] = useState<string[]>(['CA', 'NY', 'TX']);
  const [exchangeMethods, setExchangeMethods] = useState('label');
  const [reasonRules, setReasonRules] = useState({
    requirePhoto: true,
    requireNote: true,
    mandatoryOptIn: false
  });

  if (!settings.enableExchanges) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <ArrowLeftRight className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">Exchanges Not Enabled</h3>
        <p className="text-muted-foreground mb-4">Enable exchanges in the Settings tab to configure exchange options.</p>
        <Badge variant="outline">Disabled</Badge>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Test Mode Toggle */}
      <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-primary-subtle">
        <div className="flex items-center gap-2">
          <TestTube className="h-4 w-4 text-primary" />
          <Label htmlFor="exchange-test-mode" className="text-sm font-medium">Test Mode</Label>
          <Badge variant="secondary" className="text-xs">Simulate exchange logic</Badge>
        </div>
        <Switch
          id="exchange-test-mode"
          checked={testMode}
          onCheckedChange={setTestMode}
        />
      </div>

      {/* Out of Stock Warning */}
      {!settings.supportSettings.allowExchangeOutOfStock && (
        <Card className="border-warning bg-warning/5">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-warning">
              <AlertTriangle className="h-4 w-4" />
              <span className="font-medium">Out of Stock Exchange Disabled</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Customers cannot exchange items for out-of-stock products. Enable this in Settings → Advanced Support Settings.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Eligibility Rules */}
      <Card className="border-border shadow-enterprise-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Calendar className="h-4 w-4 text-primary" />
            Exchange Eligibility Rules
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="exchange-days">Number of exchangeable days</Label>
              <Input
                id="exchange-days"
                type="number"
                value={exchangeDays}
                onChange={(e) => setExchangeDays(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label>Orders between dates</Label>
              <div className="grid grid-cols-2 gap-2">
                <Input type="date" placeholder="Start date" />
                <Input type="date" placeholder="End date" />
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="multiple-exchanges"
              checked={multipleExchanges}
              onCheckedChange={(checked) => setMultipleExchanges(checked === true)}
            />
            <Label htmlFor="multiple-exchanges" className="text-sm">Allow multiple item exchanges</Label>
          </div>
        </CardContent>
      </Card>

      {/* Product Filters */}
      <Card className="border-border shadow-enterprise-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Package className="h-4 w-4 text-primary" />
            Exchange Product Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Product Tag</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select tag" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="clothing">Clothing</SelectItem>
                  <SelectItem value="home">Home & Garden</SelectItem>
                  <SelectItem value="exchangeable">Exchangeable Items</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Discount Code</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select discount" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="summer20">SUMMER20</SelectItem>
                  <SelectItem value="welcome10">WELCOME10</SelectItem>
                  <SelectItem value="loyalty15">LOYALTY15</SelectItem>
                  <SelectItem value="exchange5">EXCHANGE5</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Product Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="physical">Physical Product</SelectItem>
                  <SelectItem value="clothing">Clothing & Apparel</SelectItem>
                  <SelectItem value="accessories">Accessories</SelectItem>
                  <SelectItem value="home-goods">Home Goods</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Vendor</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select vendor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="acme">Acme Corp</SelectItem>
                  <SelectItem value="globex">Globex Industries</SelectItem>
                  <SelectItem value="initech">Initech</SelectItem>
                  <SelectItem value="fashion-plus">Fashion Plus</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Collection</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select collection" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="summer">Summer Collection</SelectItem>
                  <SelectItem value="winter">Winter Collection</SelectItem>
                  <SelectItem value="limited">Limited Edition</SelectItem>
                  <SelectItem value="exchange-friendly">Exchange Friendly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Size Compatibility</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select sizes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="same-size">Same Size Only</SelectItem>
                  <SelectItem value="size-up">Size Up Allowed</SelectItem>
                  <SelectItem value="size-down">Size Down Allowed</SelectItem>
                  <SelectItem value="any-size">Any Size</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Location Filter (State-wise)
            </Label>
            <div className="flex flex-wrap gap-2">
              {['CA', 'NY', 'TX', 'FL', 'IL', 'WA', 'PA', 'OH'].map((state) => (
                <div key={state} className="flex items-center space-x-2">
                  <Checkbox
                    id={`exchange-state-${state}`}
                    checked={selectedStates.includes(state)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedStates(prev => [...prev, state]);
                      } else {
                        setSelectedStates(prev => prev.filter(s => s !== state));
                      }
                    }}
                  />
                  <Label htmlFor={`exchange-state-${state}`} className="text-sm">{state}</Label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Exchange Methods */}
      <Card className="border-border shadow-enterprise-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Package className="h-4 w-4 text-primary" />
            Exchange Methods
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={exchangeMethods} onValueChange={setExchangeMethods}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="label" id="exchange-label" />
              <Label htmlFor="exchange-label">Send Exchange Label</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="self-ship" id="exchange-self-ship" />
              <Label htmlFor="exchange-self-ship">Ship Back Myself</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="store-exchange" id="store-exchange" />
              <Label htmlFor="store-exchange">Exchange at Store</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="direct-ship" id="direct-ship" />
              <Label htmlFor="direct-ship">Direct Ship Replacement</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Exchange Reason Rules */}
      <Card className="border-border shadow-enterprise-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <FileText className="h-4 w-4 text-primary" />
            Exchange Reason Rules (Example: "Size Issue")
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="exchange-require-photo"
                checked={reasonRules.requirePhoto}
                onCheckedChange={(checked) => setReasonRules(prev => ({ ...prev, requirePhoto: checked as boolean }))}
              />
              <Label htmlFor="exchange-require-photo" className="flex items-center gap-2">
                <Camera className="h-4 w-4" />
                Require Photo/Video
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="exchange-require-note"
                checked={reasonRules.requireNote}
                onCheckedChange={(checked) => setReasonRules(prev => ({ ...prev, requireNote: checked as boolean }))}
              />
              <Label htmlFor="exchange-require-note">Require Note Description</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="exchange-mandatory-opt-in"
                checked={reasonRules.mandatoryOptIn}
                onCheckedChange={(checked) => setReasonRules(prev => ({ ...prev, mandatoryOptIn: checked as boolean }))}
              />
              <Label htmlFor="exchange-mandatory-opt-in">Mandatory Opt-in</Label>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="exchange-custom-text">Custom Text</Label>
            <Textarea
              id="exchange-custom-text"
              placeholder="Please provide exchange reason and preferred replacement details."
              className="resize-none"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Stock Availability Alert */}
      <Card className="border-accent bg-accent-subtle">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 text-accent">
            <Package className="h-4 w-4" />
            <span className="font-medium">Stock Management Integration</span>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Exchange availability is linked to real-time inventory. Out-of-stock items are {settings.supportSettings.allowExchangeOutOfStock ? 'allowed' : 'not allowed'} for exchange.
          </p>
        </CardContent>
      </Card>

      {testMode && (
        <Card className="border-info bg-info/5">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-info">
              <TestTube className="h-4 w-4" />
              <span className="font-medium">Exchange Test Mode Active</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Exchange logic simulation is enabled. Customer flows will use these test configurations for exchange requests.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}