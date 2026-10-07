export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const routePath = url.pathname.replace(/\/+$/, '');
    const canonicalOrigin = 'https://hsdhans.design';
    const aliasHosts = new Set([
      'www.hsdhans.design',
      'hsd-design.com',
      'www.hsd-design.com',
    ]);
    const redirects = {
      '/projects/huidong-medical-center': '/projects/zhongshan-daxin-medical-center/',
      '/en/projects/huidong-medical-center': '/en/projects/zhongshan-daxin-medical-center/',
      '/projects/shenzhen-nanshan-marriott-hotel-dining': '/projects/shenzhen-nanshan-marriott-hotel/',
      '/en/projects/shenzhen-nanshan-marriott-hotel-dining': '/en/projects/shenzhen-nanshan-marriott-hotel/',
    };
    const redirectPath = redirects[routePath];

    if (redirectPath || aliasHosts.has(url.hostname)) {
      const destination = new URL(redirectPath || url.pathname, canonicalOrigin);
      destination.search = url.search;
      return Response.redirect(destination.toString(), 301);
    }

    if (url.pathname === '/baidu_verify_codeva-zmpykzu4xT.html') {
      return new Response('bb57a3493f085304f73b5340d3f48e5d', {
        status: 200,
        headers: {
          'content-type': 'text/html; charset=UTF-8',
          'cache-control': 'no-store',
        },
      });
    }

    return env.ASSETS.fetch(request);
  },
};
