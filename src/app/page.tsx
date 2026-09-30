import {getRandomSpace} from '@/lib/dataAccess';
import {Space} from '@/types/space';
import {StoreProvider} from '@/components/StoreProvider';
import {App} from '@/components/App';

export default async function Home() {
  const firstSpace: Space = await getRandomSpace();
  return (
    <StoreProvider preloaded={{
      spaces: { spaces: [firstSpace] },
      ui: { mode: "visualizer", activeSpaceId: firstSpace.id }
    }}>
        <App />
    </StoreProvider>
  );
}
