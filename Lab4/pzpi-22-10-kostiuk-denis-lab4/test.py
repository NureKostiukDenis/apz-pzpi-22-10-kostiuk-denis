from locust import HttpUser, task, between

class LoadLargeData(HttpUser):
    wait_time = between(1, 3)

    def on_start(self):
        self.token = ""
        self.api_key = ""

        self.headers = {
            "Authorization": self.token,
            "ApiKey": self.api_key,
            "Content-Type": "application/json"
        }

    @task
    def get_large_item_list(self):
        self.client.get(
            "/api/item/list-without-section",
            headers=self.headers,
            name="GET /api/item/list-without-section"
        )
