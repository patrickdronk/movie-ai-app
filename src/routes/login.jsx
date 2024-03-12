import { useEffect, useCallback, useMemo, useContext } from 'react';
import { register, Hanko } from '@teamhanko/hanko-elements';
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import { Col, Row, Image } from 'antd';
import { AuthContext } from '../config/AuthContext.js';

const hankoApi = import.meta.env.VITE_HANKO_API_URL;

export const Route = createFileRoute('/login')(
  {
    beforeLoad: ({ context, location }) => {
      if (context.isAuthenticated) {
        throw redirect({
          to: '/',
          search: {
            redirect: location.href,
          },
        });
      }
    },
    component: Login
  }
);

export default function Login() {
  const navigate = useNavigate();
  const hanko = useMemo(() => new Hanko(hankoApi), []);
  const {isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  const redirectAfterLogin = useCallback(async () => {
    await navigate({ to: '/' });
  }, [navigate]);

  useEffect(() =>
      hanko.onSessionCreated(async () => {
        setIsAuthenticated(true);
        await redirectAfterLogin();
      }),
    [hanko, redirectAfterLogin],
  );

  useEffect(() => {
    register(hankoApi).catch(error => {
      console.error('Failed to register Hanko Elements', error);
    });
  }, []);

  if(isAuthenticated) {
    redirectAfterLogin()
  }

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
