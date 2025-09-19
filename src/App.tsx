import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AxiosClient } from '@/lib/axios-client'
import { useIsMobile } from '@/hooks/use-mobile'

function App() {
  const [count, setCount] = useState(0)
  const [apiStatus, setApiStatus] = useState<string>('Not tested')
  const isMobile = useIsMobile()

  const testApi = async () => {
    try {
      setApiStatus('Testing...')
      // Test the FlexPrice SDK
      await AxiosClient.get('/health')
      setApiStatus('API is working!')
    } catch (error) {
      setApiStatus('API test failed')
      console.error('API Error:', error)
    }
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">
            FlexPrice App
          </h1>
          <p className="text-muted-foreground">
            Modern React + TypeScript + Tailwind + shadcn/ui setup
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Counter Demo</CardTitle>
              <CardDescription>
                Basic React state management
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-2xl font-bold text-center">
                Count: {count}
              </div>
              <div className="flex gap-2">
                <Button onClick={() => setCount(count + 1)}>
                  Increment
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setCount(count - 1)}
                >
                  Decrement
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => setCount(0)}
                >
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API Test</CardTitle>
              <CardDescription>
                Test FlexPrice API connection
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-status">Status:</Label>
                <Input
                  id="api-status"
                  value={apiStatus}
                  readOnly
                  className="bg-muted"
                />
              </div>
              <Button onClick={testApi} className="w-full">
                Test API Connection
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Setup Information</CardTitle>
            <CardDescription>
              Current configuration and features
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold mb-2">✅ Installed & Configured:</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Tailwind CSS with custom config</li>
                  <li>• shadcn/ui components</li>
                  <li>• Axios with interceptors</li>
                  <li>• TypeScript path aliases</li>
                  <li>• Responsive design utilities</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">📱 Device Info:</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Screen: {isMobile ? 'Mobile' : 'Desktop'}</li>
                  <li>• Breakpoint: {isMobile ? '< 768px' : '≥ 768px'}</li>
                  <li>• Theme: Light mode</li>
                  <li>• Font: Inter</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default App
