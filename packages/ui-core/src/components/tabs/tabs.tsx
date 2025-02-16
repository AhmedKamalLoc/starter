import { Tabs as ShadcnTabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export type TabProps = {
  value: string;
  label: React.ReactNode;
  content: React.ReactNode;
};

type TabsProps = {
  tabs: TabProps[];
  listClassName?: string;
  triggerClassName?: string;
} & React.ComponentProps<typeof ShadcnTabs>;

export function Tabs({
  tabs = [],
  listClassName = '',
  triggerClassName = '',
  defaultValue = tabs[0]?.value,
  ...props
}: TabsProps) {
  return (
    <ShadcnTabs {...props} defaultValue={defaultValue}>
      <TabsList className={listClassName}>
        {tabs.map(({ value, label }) => (
          <TabsTrigger className={triggerClassName} key={value} value={value}>
            {label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map(({ value, content }) => (
        <TabsContent key={value} value={value}>
          {content}
        </TabsContent>
      ))}
    </ShadcnTabs>
  );
}
