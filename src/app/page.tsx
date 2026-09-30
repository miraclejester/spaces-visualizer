import {SEED_SPACES} from '@/lib/seedSpaces';
import {StoreProvider} from '@/components/StoreProvider';
import {App} from '@/components/App';

export default function Home() {
  return (
    <StoreProvider preloaded={{
      spaces: { spaces: SEED_SPACES },
      ui: { mode: "visualizer", activeSpaceId: SEED_SPACES[0].id }
    }}>
        <App />
    </StoreProvider>
  );
}
