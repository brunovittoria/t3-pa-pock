"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { trpc } from "~/utils/trpc";

export default function BusinessCenterPage() {
  const searchParams = useSearchParams();
  const [bcId, setBcId] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("list");

  const { refetch: fetchBusinessCenters } = trpc.businessCenter.getBusinessCenterList.useQuery(
    {},
    { enabled: false }
  );
  const { refetch: fetchActivityLog } = trpc.businessCenter.getBusinessCenterActivityLog.useQuery(
    { bcId },
    { enabled: false }
  );
  const { refetch: fetchAdAccountBalance } = trpc.advertiser.getAdAccountBalance.useQuery(
    { bcId },
    { enabled: false }
  );

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && ["list", "activity", "balance", "create"].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleGetBusinessCenters = async () => {
    try {
      setLoading(true);
      const result = await fetchBusinessCenters();
      setResponse(result.data);
    } catch (error) {
      console.error("Error fetching business centers:", error);
      setResponse(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGetActivityLog = async () => {
    if (!bcId) return;
    try {
      setLoading(true);
      const result = await fetchActivityLog();
      setResponse(result.data);
    } catch (error) {
      console.error("Error fetching activity log:", error);
      setResponse(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGetAdAccountBalance = async () => {
    if (!bcId) return;
    try {
      setLoading(true);
      const result = await fetchAdAccountBalance();
      setResponse(result.data);
    } catch (error) {
      console.error("Error fetching ad account balance:", error);
      setResponse(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-3xl font-bold">Business Center</h1>

      <div className="mb-6">
        <Label htmlFor="bcId">Business Center ID</Label>
        <Input
          id="bcId"
          value={bcId}
          onChange={(e) => setBcId(e.target.value)}
          placeholder="Enter Business Center ID"
          className="mt-2"
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="list">List Centers</TabsTrigger>
          <TabsTrigger value="activity">Activity Log</TabsTrigger>
          <TabsTrigger value="balance">Account Balance</TabsTrigger>
          <TabsTrigger value="create">Create Account</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>Get Business Centers</CardTitle>
            </CardHeader>
            <CardContent>
              <Button onClick={handleGetBusinessCenters} disabled={loading}>
                {loading ? "Loading..." : "Get Business Centers"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Get Activity Log</CardTitle>
            </CardHeader>
            <CardContent>
              <Button onClick={handleGetActivityLog} disabled={loading || !bcId}>
                {loading ? "Loading..." : "Get Activity Log"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="balance">
          <Card>
            <CardHeader>
              <CardTitle>Get Ad Account Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <Button onClick={handleGetAdAccountBalance} disabled={loading || !bcId}>
                {loading ? "Loading..." : "Get Account Balance"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle>Create Ad Account</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                This feature requires additional form fields. Coming soon...
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {response && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Response</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="max-h-[400px] overflow-auto rounded bg-gray-100 p-4">
              {JSON.stringify(response, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 