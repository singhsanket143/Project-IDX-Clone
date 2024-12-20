import { ConfigProvider } from 'antd';

import { About } from '../components/organisms/About/About';
import { Features } from '../components/organisms/Features/Features';
import { Hero } from '../components/organisms/Hero/Hero';
import { Testimonials } from '../components/organisms/Testimonials/Testimonials';

function LandingPage() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#3B82F6',
          borderRadius: 8,
        },
      }}
    >
      <main>
        <Hero />
        <Features />
        <Testimonials />
        <About />
      </main>
    </ConfigProvider>
  );
}

export default LandingPage;
