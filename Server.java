import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;

public class Server {
    public static void main(String[] args) throws IOException {
        int port = 3000;
        HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);
        server.createContext("/", new StaticFileHandler());
        server.setExecutor(null);
        System.out.println("Server running at http://localhost:" + port + "/");
        server.start();
    }

    static class StaticFileHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            String uriPath = exchange.getRequestURI().getPath();
            if (uriPath.equals("/")) {
                uriPath = "/index.html";
            }

            File file = new File("." + uriPath);
            if (!file.exists() || file.isDirectory()) {
                String response = "404 (Not Found)\n";
                exchange.sendResponseHeaders(404, response.length());
                OutputStream os = exchange.getResponseBody();
                os.write(response.getBytes());
                os.close();
                return;
            }

            String contentType = "text/plain";
            if (uriPath.endsWith(".html")) contentType = "text/html";
            else if (uriPath.endsWith(".css")) contentType = "text/css";
            else if (uriPath.endsWith(".js")) contentType = "application/javascript";
            else if (uriPath.endsWith(".png")) contentType = "image/png";
            else if (uriPath.endsWith(".jpg") || uriPath.endsWith(".jpeg")) contentType = "image/jpeg";
            else if (uriPath.endsWith(".svg")) contentType = "image/svg+xml";

            exchange.getResponseHeaders().set("Content-Type", contentType);
            exchange.sendResponseHeaders(200, file.length());

            OutputStream os = exchange.getResponseBody();
            FileInputStream fis = new FileInputStream(file);
            byte[] buffer = new byte[4096];
            int count;
            while ((count = fis.read(buffer)) >= 0) {
                os.write(buffer, 0, count);
            }
            fis.close();
            os.close();
        }
    }
}