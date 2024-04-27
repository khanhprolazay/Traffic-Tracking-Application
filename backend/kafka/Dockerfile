FROM maven:3.6.3-jdk-11 AS build

ENV APP_ROOT /home/kafka

WORKDIR ${APP_ROOT}

COPY . .

RUN mvn clean install

FROM confluentinc/cp-kafka:latest

COPY --from=build /home/kafka/oauth-common/target/kafka-oauth-common-*.jar /usr/share/java/kafka/
COPY --from=build /home/kafka/oauth-server/target/kafka-oauth-server-*.jar /usr/share/java/kafka/
COPY --from=build /home/kafka/oauth-server-plain/target/kafka-oauth-server-plain-*.jar /usr/share/java/kafka/
COPY --from=build /home/kafka/oauth-keycloak-authorizer/target/kafka-oauth-keycloak-authorizer-*.jar /usr/share/java/kafka/
COPY --from=build /home/kafka/oauth-client/target/kafka-oauth-client-*.jar /usr/share/java/kafka/
COPY --from=build /home/kafka/oauth-common/target/lib/nimbus-jose-jwt-*.jar /usr/share/java/kafka/

COPY --from=build /home/kafka/oauth-server/target/lib/json-path-*.jar /usr/share/java/kafka/
COPY --from=build /home/kafka/oauth-server/target/lib/json-smart-*.jar /usr/share/java/kafka/
COPY --from=build /home/kafka/oauth-server/target/lib/accessors-smart-*.jar /usr/share/java/kafka/



