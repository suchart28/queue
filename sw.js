// sw.js
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    // ถ้าผู้ใช้กดที่แจ้งเตือน ให้พยายามดึงหน้าต่างเบราว์เซอร์เดิมกลับมา
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
            for (var i = 0; i < clientList.length; i++) {
                var client = clientList[i];
                if ('focus' in client) { return client.focus(); }
            }
            if (clients.openWindow) { return clients.openWindow('/'); }
        })
    );
});
