import asyncio
import websockets
import io
import sys
import os as ps
import shutil


def execute_code(code):
    try:
        stdout_capture = io.StringIO()
        sys.stdout = stdout_capture
        exec(code, globals())
        stdout_output = stdout_capture.getvalue()
        sys.stdout = sys.__stdout__
        return stdout_output
    except Exception as e:
        return str(e)


def move_files():
    assets_path = ps.path.join("app", "pyassets")  # Update the assets folder path
    current_dir = ps.getcwd()
    moved_files = []
    for filename in ps.listdir(current_dir):
        full_path = ps.path.join(current_dir, filename)
        if ps.path.isfile(full_path) and filename != "server.py":
            new_path = ps.path.join(assets_path, filename)
            shutil.move(full_path, new_path)
            moved_files.append(filename)
    return moved_files


def generate_links(filenames, base_url):
    if not base_url:
        return []
    base_url = base_url + "/assets/pyassets"
    links = [f"![{filename}]({base_url}/{filename})" for filename in filenames]
    return links


async def handle_client(websocket, path):
    try:
        code = await websocket.recv()
        result = execute_code(code)
        filenames = move_files()
        links = generate_links(filenames)
        final_result = f"{result}\n"
        final_result += "\n".join(links)
        await websocket.send(final_result)
    except websockets.exceptions.ConnectionClosed:
        pass


async def server(websocket, path):
    print(f"Incoming connection from {websocket.remote_address}")
    while True:
        await handle_client(websocket, path)


default_port = 3380
host = ps.environ.get("HOST", "0.0.0.0")
try:
    port = int(ps.environ.get("PORT", default_port))
except ValueError:
    print("Invalid PORT value provided. Using default port {default_port}.")
    port = default_port

protocol = "http"
base_url = f"{protocol}://{host}:{port}"

start_server = websockets.serve(server, host, port)

print(f"Server started 🚀, listening on {base_url}")

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
