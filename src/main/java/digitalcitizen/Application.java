package digitalcitizen;

import com.google.inject.Guice;
import com.google.inject.Injector;
import com.google.inject.Module;
import no.difi.idporten.oidc.proxy.config.ConfigModule;
import no.difi.idporten.oidc.proxy.proxy.NettyHttpListener;
import no.difi.idporten.oidc.proxy.proxy.ProxyModule;
import no.difi.idporten.oidc.proxy.storage.StorageModule;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;


import java.util.ArrayList;

@SpringBootApplication
@RestController
public class Application {

    public static boolean USE_MONGODB = false;

    public static void main(String[] args) {

        Injector injector = Guice.createInjector(new ArrayList<Module>() {{
            add(new ConfigModule());
            add(new StorageModule());
            add(new ProxyModule());
        }});

        SpringApplication.run(Application.class, args);
        injector.getInstance(NettyHttpListener.class).run();

    }
}
