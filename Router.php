<?php
/*$router = new Router();

$router->get('', 'ProductList::index');
$router->get('/products/get', 'ProductList::show');

$router->post('/products/add', 'ProductList::add');
$router->post('/products/delete', 'ProductList::delete');

$router->check();
*/

namespace app;

class Router
{
    private array $getRoutes = [];
    private array $postRoutes = [];

    public function get($url, $fn)
    {
        $this->getRoutes[$url] = $fn;
    }
    public function post($url, $fn)
    {
        $this->postRoutes[$url] = $fn;
    }
    public function resolve()
    {
        $url = $_SERVER['REQUEST_URI'] ?? '/';
        /*if (strpos($url, '?')) {
            $url = substr($url, 0, strpos($url, '?'));
        }*/
        $method = strtolower($_SERVER['REQUEST_METHOD']);

        if ($method === 'get' && $url==='/') {
            $fn = $this->getRoutes[$url] ?? null;
        } else {
            $fn = $this->postRoutes[$url] ?? null;
        }

        if ($fn) {
            call_user_func($fn);
        } else {
           echo "Page Not Found";
        }
    }
}