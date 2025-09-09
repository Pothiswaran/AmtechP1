import RichText from '../components/RichText';
import Head from 'next/head';
import demoData from 'data/demo.json'; // import your local JSON

const About = (): JSX.Element => {
  const route = demoData.sitecore.route;

  return (
    <>
      <Head>
        <title>{route.fields.Title.value}</title>
      </Head>

      {/* Render components from the main placeholder */}
      {route.placeholders['headless-main'].map((component) => {
        if (component.componentName === 'RichText') {
          return <RichText key={component.uid} fields={component.fields} />;
        }
        return null; // handle other component types if needed
      })}

      {/* Additional static content if needed */}
      <div className="container" style={{ padding: 10 }}>
        <h1>{route.fields.Title.value}</h1>
      </div>
    </>
  );
};

export default About;
