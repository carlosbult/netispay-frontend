'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@components/ui/card';
import { Label } from '@components/ui/label';
import { useState } from 'react';

const Balance = () => {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState('');
  const [error, setError] = useState<string | null>(null);

  console.log(error);

  const handleAddFunds = () => {
    const value = parseFloat(amount);
    if (isNaN(value) || value <= 0) {
      setError('Please enter a valid positive number');
      return;
    }
    setBalance((prevBalance) => prevBalance + value);
    setAmount('');
    setError(null);
  };

  return (
    <Card className="w-full ">
      <CardHeader>
        <CardTitle>Account Balance</CardTitle>
        <CardDescription>Manage your account balance</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-4">
          Current Balance: ${balance.toFixed(2)}
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />
          </div>
          {/* {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )} */}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={handleAddFunds}>Add Funds</Button>
      </CardFooter>
    </Card>
  );
};

export default Balance;
