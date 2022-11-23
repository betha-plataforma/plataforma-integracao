package com.betha.plataforma.bethacon.infra;

import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoDatabase;
import org.bson.codecs.configuration.CodecRegistries;
import org.bson.codecs.configuration.CodecRegistry;
import org.bson.codecs.pojo.PojoCodecProvider;
import org.springframework.context.annotation.Bean;

public class MongoClientFactory {

    @Bean
    public MongoDatabase mongoClient(final MongoClient mongoClient) {
        final CodecRegistry codecRegistry = CodecRegistries.fromRegistries(
                MongoClientSettings.getDefaultCodecRegistry(),
                CodecRegistries.fromProviders(PojoCodecProvider.builder().automatic(true).build())
        );

        return mongoClient.getDatabase("seubanco")
                .withCodecRegistry(codecRegistry);
    }
}
