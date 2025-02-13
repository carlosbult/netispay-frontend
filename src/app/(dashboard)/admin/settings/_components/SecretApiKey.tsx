'use client';

import { Button } from '@/components/ui/button';
import { Check, Clipboard, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

interface ISecretApiKeyProps {
  ispKey: string;
}

const SecretApiKey = (props: ISecretApiKeyProps) => {
  const { ispKey } = props;
  const [copied, setCopied] = useState(false);
  const [showKey, setShowKey] = useState(false);

  const copyApiKey = async () => {
    await navigator.clipboard.writeText(ispKey);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const toggleKeyVisibility = () => {
    setShowKey(!showKey);
  };

  const maskedKey = '•'.repeat(ispKey.length);
  return (
    <div className="space-y-2">
      <h3 className="font-medium">API Key</h3>
      <div className="flex items-center gap-2">
        <code className="flex-1 rounded bg-muted p-2 font-mono text-sm">
          {showKey ? ispKey : maskedKey}
        </code>
        <Button
          size="icon"
          variant="ghost"
          onClick={toggleKeyVisibility}
          className="h-9 w-9"
        >
          {showKey ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
          <span className="sr-only">
            {showKey ? 'Hide API ispKey' : 'Show API ispKey'}
          </span>
        </Button>
        <Button
          size="icon"
          variant="ghost"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={copyApiKey}
          className="h-9 w-9"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Clipboard className="h-4 w-4" />
          )}
          <span className="sr-only">Copy API ispKey</span>
        </Button>
      </div>
    </div>
  );
};
export default SecretApiKey;
