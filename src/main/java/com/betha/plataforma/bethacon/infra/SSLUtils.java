package com.betha.plataforma.bethacon.infra;

import javax.net.ssl.*;
import java.security.GeneralSecurityException;
import java.security.SecureRandom;
import java.security.cert.X509Certificate;

public class SSLUtils {
    private final static HostnameVerifier hostnameVerifier = new FakeHostnameVerifier();
    private final static TrustManager[] trustManagers = new TrustManager[]{new FakeX509TrustManager()};

    public static void trustAllHostnames() {
        HttpsURLConnection.setDefaultHostnameVerifier(hostnameVerifier);
    }

    public static void trustAllHttpsCertificates() {
        SSLContext context;
        try {
            context = SSLContext.getInstance("SSL");
            context.init(null, trustManagers, new SecureRandom());
            SSLContext.setDefault(context);
        } catch (GeneralSecurityException gse) {
            throw new IllegalStateException(gse.getMessage());
        }

        HttpsURLConnection.setDefaultSSLSocketFactory(context.getSocketFactory());
    }

    public static class FakeHostnameVerifier implements HostnameVerifier {
        public boolean verify(String hostname, SSLSession session) {
            return (true);
        }
    }

    public static class FakeX509TrustManager implements X509TrustManager {

        private static final X509Certificate[] acceptedIssuers = new X509Certificate[]{};

        public void checkClientTrusted(X509Certificate[] chain, String authType) {
        }

        public void checkServerTrusted(X509Certificate[] chain, String authType) {
        }

        public X509Certificate[] getAcceptedIssuers() {
            return (acceptedIssuers);
        }
    }
}
