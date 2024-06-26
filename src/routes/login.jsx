import { useEffect, useMemo, useContext } from 'react';
import { register, Hanko } from '@teamhanko/hanko-elements';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Col, Row, Image } from 'antd';
import { AuthContext } from '../config/AuthContext.js';

const hankoApi = import.meta.env.VITE_HANKO_API_URL;

export const Route = createFileRoute('/login')({
  component: Login,
});

export default function Login() {
  const navigate = useNavigate();
  const hanko = useMemo(() => new Hanko(hankoApi), []);
  const { isAuthenticated, setSession } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: '/' });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() =>
      hanko.onSessionCreated(async (session) => {
        setSession({ jwt: session.jwt, isAuthenticated: true });
      }),
    [hanko, setSession],
  );

  useEffect(() => {
    register(hankoApi).catch(error => {
      console.error('Failed to register Hanko Elements', error);
    });
  }, []);

  return (
    <div className="login-container">
      <Row justify="center" align="middle" style={{ flexDirection: 'column', marginTop: '-10%' }}>
        <Col style={{ marginBottom: '24px' }}>
          <Image
            src="/movingup.png"
            alt="Company Logo"
            preview={false}
            style={{ maxWidth: '200px', maxHeight: '100px' }}
          />
        </Col>
        <Col>
          <hanko-auth />
        </Col>
      </Row>
    </div>
  );
}